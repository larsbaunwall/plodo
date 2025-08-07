#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{AppHandle, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem, Wry};

fn build_tray() -> SystemTray {
    let menu = SystemTrayMenu::new()
        .add_item(SystemTrayMenuItem::new("toggle", "Toggle plodo").unwrap())
        .add_item(SystemTrayMenuItem::new("quit", "Quit").unwrap());
    SystemTray::new().with_menu(menu)
}

fn handle_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::MenuItemClick { id, .. } => {
            match id.as_str() {
                "toggle" => {
                    if let Some(win) = app.get_webview_window("main") {
                        if let Ok(visible) = win.is_visible() {
                            if visible { let _ = win.hide(); } else { let _ = win.show(); let _ = win.set_focus(); }
                        }
                    }
                }
                "quit" => {
                    std::process::exit(0);
                }
                _ => {}
            }
        }
        _ => {}
    }
}

fn main() {
    tauri::Builder::<Wry>::default()
        .system_tray(build_tray())
        .on_system_tray_event(handle_tray_event)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
