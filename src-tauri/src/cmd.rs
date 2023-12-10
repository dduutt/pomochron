use crate::tray;
use tauri::Manager;
#[tauri::command]
pub fn update_tray_popup(app: tauri::AppHandle, is_popup: bool) {
    let tray_handle = app.tray_handle();
    let is_popup_tray = tray_handle.get_item("is_popup");

    let title = if is_popup { "Popup √" } else { "Popup" };
    is_popup_tray.set_title(title).unwrap();
}

#[tauri::command]
pub fn update_tray_always_on_top(app: tauri::AppHandle, is_always_on_top: bool) {
    let tray_handle = app.tray_handle();
    let is_always_on_top_tray = tray_handle.get_item("is_always_on_top");

    let title = if is_always_on_top {
        "Always on top √"
    } else {
        "Always on top"
    };
    is_always_on_top_tray.set_title(title).unwrap();

    let window = app.get_window("main").unwrap();
    window.set_always_on_top(is_always_on_top).unwrap();
}

#[tauri::command]
pub fn set_tray(app: tauri::AppHandle, is_always_on_top: bool, is_popup: bool) {
    let tray_menu = tray::create_tray_menu(is_always_on_top, is_popup);
    let tray_handle = app.tray_handle();
    tray_handle.set_menu(tray_menu).unwrap();
    let window = app.get_window("main").unwrap();
    window.set_always_on_top(is_always_on_top).unwrap();
}
