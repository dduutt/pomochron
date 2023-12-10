use tauri::{CustomMenuItem, Manager, SystemTrayEvent, SystemTrayMenu};

pub fn create_tray_menu(is_always_on_top: bool, is_popup: bool) -> SystemTrayMenu {
    let is_always_on_top_title = if is_always_on_top {
        "Always on top √"
    } else {
        "Always on top"
    };

    let is_popup_title = if is_popup { "Popup √" } else { "Popup" };

    // 这里 `"quit".to_string()` 定义菜单项 ID，第二个参数是菜单项标签。
    let quit = CustomMenuItem::new("quit", "Quit");
    let popup = CustomMenuItem::new("is_popup", is_popup_title);
    let always_on = CustomMenuItem::new("is_always_on_top", is_always_on_top_title);

    let tray_menu = SystemTrayMenu::new()
        .add_item(popup)
        .add_item(always_on)
        .add_item(quit);

    tray_menu
}

pub fn handle_system_tray_event(app: &tauri::AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => handle_left_click(app),
        SystemTrayEvent::RightClick {
            position: _,
            size: _,
            ..
        } => {}
        SystemTrayEvent::DoubleClick {
            position: _,
            size: _,
            ..
        } => {}
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => handle_quit(app),
            "is_popup" => handle_popup(app),
            "is_always_on_top" => handle_always_on_top(app),
            _ => {}
        },
        _ => {}
    }
}

fn handle_left_click(app: &tauri::AppHandle) {
    let window = app.get_window("main").unwrap();
    if window.is_visible().unwrap() {
        window.hide().expect("Failed to hide window");
    } else {
        window.show().expect("Failed to show window");
        window.set_focus().expect("Failed to set focus");
    }
}

fn handle_popup(app: &tauri::AppHandle) {
    let window = app.get_window("main").unwrap();
    window.emit("popup", {}).unwrap();
}

fn handle_always_on_top(app: &tauri::AppHandle) {
    let window = app.get_window("main").unwrap();
    window.emit("always_on_top", {}).unwrap();
}

fn handle_quit(app: &tauri::AppHandle) {
    app.exit(0);
}
