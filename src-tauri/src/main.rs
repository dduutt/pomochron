// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod cmd;
mod tray;
use tauri::Manager;
use window_shadows::set_shadow;

use tauri::SystemTray;
// fn main() {
//     let tray_menu = tray::create_tray_menu(true, true);
//     tauri::Builder::default()
//         .invoke_handler(tauri::generate_handler![
//             cmd::set_tray_popup,
//             cmd::set_tray_always_on_top
//         ])
//         .system_tray(SystemTray::new().with_menu(tray_menu))
//         .on_system_tray_event(|app, event| tray::handle_system_tray_event(app, event))
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

fn main() {
    tauri::Builder::default()
        .setup(move |app| {
            let window = app.get_window("main").unwrap();
            set_shadow(&window, true).expect("Unsupported platform!");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            cmd::update_tray_popup,
            cmd::update_tray_always_on_top,
            cmd::set_tray
        ])
        .system_tray(SystemTray::new())
        .on_system_tray_event(|app, event| tray::handle_system_tray_event(app, event))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
