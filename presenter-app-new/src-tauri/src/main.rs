#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{
    CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
    WindowBuilder, WindowUrl, Window, WindowEvent
};
use window_shadows::set_shadow;
use tauri::State;
use std::sync::Mutex;

struct CelebrationState(Mutex<bool>);

#[tauri::command]
fn toggle_celebration(state: State<CelebrationState>, app_handle: tauri::AppHandle, show: bool) {
    let mut celebration_state = state.0.lock().unwrap();
    *celebration_state = show;
    
    if show {
        // Create celebration window if it doesn't exist
        if app_handle.get_window("celebration").is_none() {
            let celebration_window = WindowBuilder::new(
                &app_handle,
                "celebration",
                WindowUrl::App("/#/celebrate".into())
            )
            .title("Celebration")
            .decorations(false)
            .transparent(true)
            .always_on_top(true)
            .fullscreen(true)
            .build()
            .unwrap();
            
            // Make the window ignore mouse events
            #[cfg(target_os = "macos")]
            unsafe {
                use cocoa::base::YES;
                let ns_window = celebration_window.ns_window().unwrap() as cocoa::base::id;
                cocoa::appkit::NSWindow::setIgnoresMouseEvents_(ns_window, YES);
            }
            
            #[cfg(target_os = "windows")]
            unsafe {
                use windows::Win32::UI::WindowsAndMessaging::{
                    GetWindowLongW, SetWindowLongW, GWL_EXSTYLE, WS_EX_TRANSPARENT, HWND
                };
                let hwnd = HWND(celebration_window.hwnd().unwrap() as isize);
                let ex_style = GetWindowLongW(hwnd, GWL_EXSTYLE);
                SetWindowLongW(hwnd, GWL_EXSTYLE, ex_style | WS_EX_TRANSPARENT as i32);
            }
        }
    } else {
        // Close celebration window if it exists
        if let Some(window) = app_handle.get_window("celebration") {
            window.close().unwrap();
        }
    }
}

#[tauri::command]
fn get_screens() -> Vec<Screen> {
    // In a real implementation, this would use platform-specific APIs
    // to get actual screen information
    vec![
        Screen {
            id: "primary".to_string(),
            size: Size { width: 1920, height: 1080 },
            bounds: Bounds { x: 0, y: 0 },
            is_primary: true,
        }
    ]
}

#[derive(serde::Serialize)]
struct Screen {
    id: String,
    size: Size,
    bounds: Bounds,
    is_primary: bool,
}

#[derive(serde::Serialize)]
struct Size {
    width: u32,
    height: u32,
}

#[derive(serde::Serialize)]
struct Bounds {
    x: i32,
    y: i32,
}

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let show = CustomMenuItem::new("show".to_string(), "Show");
    let version = CustomMenuItem::new("version".to_string(), format!("plodo v{}", env!("CARGO_PKG_VERSION")))
        .disabled();
    
    let tray_menu = SystemTrayMenu::new()
        .add_item(show)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(version)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    
    let system_tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .manage(CelebrationState(Mutex::new(false)))
        .invoke_handler(tauri::generate_handler![toggle_celebration, get_screens])
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick { .. } => {
                let window = app.get_window("main").unwrap();
                if window.is_visible().unwrap() {
                    window.hide().unwrap();
                } else {
                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    app.exit(0);
                }
                "show" => {
                    let window = app.get_window("main").unwrap();
                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
                _ => {}
            },
            _ => {}
        })
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            
            #[cfg(any(windows, target_os = "macos"))]
            set_shadow(&window, true).expect("Unsupported platform!");
            
            Ok(())
        })
        .on_window_event(|event| {
            match event.event() {
                WindowEvent::CloseRequested { api, .. } => {
                    // Prevent the window from actually closing
                    api.prevent_close();
                    // Just hide it instead
                    event.window().hide().unwrap();
                }
                _ => {}
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}