/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'


import { listen } from '@tauri-apps/api/event'

import { invoke } from '@tauri-apps/api'

const app = createApp(App)


const tray_menu_listener = [];

// 初始化托盘区菜单
init_tray()

// 监听托盘区菜单点击事件

add_tray_menu_listener()



registerPlugins(app)

app.mount('#app')





function init_tray() {
    const config = get_app_config()
    invoke('set_tray', {
        "isPopup": config.is_popup,
        "isAlwaysOnTop": config.is_always_on_top,
    })
}

function add_tray_menu_listener() {
    listen('popup', (event) => {
        // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
        // event.payload is the payload object

        const config = get_app_config();
        config.is_popup = !config.is_popup;
        invoke('update_tray_popup', { isPopup: config.is_popup });
        set_app_config(config);
    }).then(r => {
        tray_menu_listener.push(r);
    })

    listen('always_on_top', (event) => {
        // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
        // event.payload is the payload object

        const config = get_app_config();
        config.is_always_on_top = !config.is_always_on_top;
        invoke('update_tray_always_on_top', { isAlwaysOnTop: config.is_always_on_top });
        set_app_config(config);
    }).then(r => {
        tray_menu_listener.push(r);
    })

}


function get_app_config() {
    const app_config = localStorage.getItem('app_config');
    const config = app_config ? JSON.parse(app_config) : { "is_popup": true, "is_always_on_top": true }
    return config;
}

function set_app_config(config) {
    localStorage.setItem('app_config', JSON.stringify(config));
}


function remove_tray_menu_listener() {
    tray_menu_listener.forEach(l => l());
}




