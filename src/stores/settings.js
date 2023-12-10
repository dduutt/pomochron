
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        settings: [
            {
                name: "focus",
                label: "Focus",
                color: "red",
                value: 25,
            },
            {
                name: "shortBreak",
                label: "Short Break",
                color: "green",
                value: 5,
            },
            {
                name: "longBreak",
                label: "Long Break",
                color: "blue",
                value: 30,

            },
            {
                name: "rounds",
                label: "Rounds",
                color: "blue-grey-lighten-3",
                value: 4,
            }
        ]
    }),
    actions: {
        loadSettings() {
            const settings = localStorage.getItem('settings');
            if (settings) {
                this.settings = JSON.parse(settings);
                return
            }
            localStorage.setItem('settings', JSON.stringify(this.settings));

        },
        setDefault() {
            this.$reset()
        },
        saveSettings(settings) {
            this.settings = settings;
            localStorage.setItem('settings', JSON.stringify(settings));
        }
    },
})