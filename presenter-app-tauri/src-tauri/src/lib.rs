use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, TrayIconBuilder, TrayIconEvent},
    Manager, WebviewUrl, WebviewWindowBuilder,
};
use tauri::{command, AppHandle, PhysicalSize};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(serde::Serialize)]
struct MonitorInfo {
    id: String,
    name: String,
    size: MonitorSize,
    is_primary: bool,
}

#[derive(serde::Serialize)]
struct MonitorSize {
    width: u32,
    height: u32,
}

#[command]
fn enumerate_displays(app: AppHandle) -> Vec<MonitorInfo> {
    let primary = app.primary_monitor().ok().flatten();
    let mut list: Vec<MonitorInfo> = vec![];
    if let Ok(monitors) = app.available_monitors() {
        for m in monitors {
            let name = m.name().cloned().unwrap_or_default();
            let size: PhysicalSize<u32> = *m.size();
            let is_primary = if let Some(ref p) = primary {
                p.name() == m.name()
            } else {
                false
            };
            list.push(MonitorInfo {
                id: name.clone(),
                name: name.clone(),
                size: MonitorSize { width: size.width, height: size.height },
                is_primary,
            });
        }
    }
    list
}

#[command]
fn show_celebration_window(app: AppHandle, _screen_id: String) -> Result<(), String> {
    if let Some(win) = app.get_webview_window("celebration") {
        let _ = win.show();
        let _ = win.set_focus();
        return Ok(());
    }
    let window = WebviewWindowBuilder::new(&app, "celebration", WebviewUrl::App("index.html#/celebrate".into()))
        .title("Celebration")
        .decorations(false)
        .transparent(true)
        .always_on_top(true)
        .build()
        .map_err(|e| e.to_string())?;
    let _ = window.set_focus();
    Ok(())
}

#[command]
fn hide_celebration_window(app: AppHandle) {
    if let Some(win) = app.get_webview_window("celebration") {
        let _ = win.hide();
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let quit = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let show = MenuItem::with_id(app, "show", "Show Window", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&show, &quit])?;

            let _tray = TrayIconBuilder::with_id("main")
                .tooltip("Plodo Presenter")
                .icon(app.default_window_icon().unwrap().clone())
                .menu(&menu)
                .show_menu_on_left_click(false)
                .on_menu_event(move |app, event| match event.id.as_ref() {
                    "quit" => {
                        app.exit(0);
                    }
                    "show" => {
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                    _ => {}
                })
                .on_tray_icon_event(|tray, event| {
                    if let TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: tauri::tray::MouseButtonState::Up,
                        ..
                    } = event
                    {
                        let app = tray.app_handle();
                        if let Some(window) = app.get_webview_window("main") {
                            if window.is_visible().unwrap_or(false) {
                                let _ = window.hide();
                            } else {
                                let _ = window.show();
                                let _ = window.set_focus();
                            }
                        } else {
                            let window =
                                WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
                                    .title("Plodo Presenter")
                                    .inner_size(800.0, 600.0)
                                    .build()
                                    .unwrap();
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                })
                .build(app)?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, enumerate_displays, show_celebration_window, hide_celebration_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
