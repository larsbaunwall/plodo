#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Wry;

fn main() {
    tauri::Builder::<Wry>::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
