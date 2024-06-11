/*
一、开始计时
    清除计时器
    判断计时类型
    设置计时器
二、计时结束。
    清除计时器
    判断计时类型
    修改显示内容
    进入下一阶段
    专注次数加一
三、点击下一阶段，开始下一阶段专注计时
四、点击暂停按钮，暂停计时
五、点击重置计时按钮，重置至初始状态

*/




import { defineStore } from 'pinia'
import { appWindow } from '@tauri-apps/api/window';


export const useTimerStore = defineStore('timer', {
    state: () => ({
        isFocusTimer: true,
        seconds: 0,
        isPlay: false,
        timer: [],
        focusCount: 1,
        value: 4,
        settings: []
    }),
    getters: {
        formatTime(state) {
            const seconds = state.seconds ? state.seconds : state.settings.focus;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(remainingSeconds).padStart(2, '0');
            return `${formattedMinutes}:${formattedSeconds}`;
        },
        progress(state) {
            return `${state.focusCount}/${state.settings.rounds}`;
        },
        circular(state) {
            return state.seconds ? ((state.value - state.seconds) / state.value * 100) | 0 : 0
        },
    },
    actions: {
        // 开始计时
        startTimer() {
            // 清除计时器
            this.stopTimer();
            // 判断计时类型
            if (this.isFocusTimer) {
                this.startFocusTimer()
            } else {
                this.startBreakTimer();
            }
        },

        // 跳过当前计时
        nextTimer() {
            this.seconds = 0
            this.isPlay = false
            this.handleTimerEnd()
        },

        startBreakTimer() {
            // 判断专注次数并设置时间
            if (this.focusCount >= this.settings.rounds) {
                // 休息
                this.seconds = this.seconds ? this.seconds : this.settings.longBreak;
                this.value = this.settings.longBreak;
            } else {
                this.seconds = this.seconds ? this.seconds : this.settings.shortBreak;
                this.value = this.settings.shortBreak;
            }
            // 开始休息计时器
            this.isPlay && this.timer.push(setInterval(() => {
                this.seconds--
                if (this.seconds <= 0) {
                    this.handleBreakTimerEnd()
                }
            }, 1000))
        },
        startFocusTimer() {
            // 重置专注时间
            this.seconds = this.seconds ? this.seconds : this.settings.focus;
            this.value = this.settings.focus;
            // 设置计时器
            this.isPlay && this.timer.push(setInterval(() => {
                // 修改显示内容
                this.seconds--;
                if (this.seconds <= 0) {
                    this.handleTimerEnd();
                }

            }, 1000))
        },
        stopTimer() {

            this.timer.forEach(t => {
                clearInterval(t);
            })
            this.timer = [];
        },
        handleTimerEnd() {
            // 清除计时器
            this.stopTimer()
            // 判断当前计时器类型
            if (this.isFocusTimer) {
                this.handleFocusTimerEnd();
            } else {
                this.handleBreakTimerEnd();
            }
        },

        // 结束放松计时
        handleBreakTimerEnd() {
            this.isFocusTimer = !this.isFocusTimer;
            this.focusCount++
            if (this.focusCount > this.settings.rounds) {
                this.focusCount = 1
            }

            this.startTimer();

        },
        // 结束专注计时
        handleFocusTimerEnd() {
            // 修改计时器类型
            this.isFocusTimer = !this.isFocusTimer;
            // 开始计时
            this.startTimer();

            if (!this.isPlay) {
                return
            }
            // 弹出提醒
            const app_config = localStorage.getItem('app_config');
            const config = app_config ? JSON.parse(app_config) : {
                'is_popup': true,
                'is_always_on_top': true,
            }
            if (config.is_popup) {
                appWindow.show()
            }
            // 播放音频
            const audio = document.getElementById('audio');
            audio && audio.play()
        },
        // 重置timer
        initTimer() {
            // 清除计时器
            this.stopTimer();
            // 重置状态
            this.$reset()
            // 加载配置
            const settings = JSON.parse(localStorage.getItem('settings'))
            settings.forEach((e) => {
                // 分转为秒
                settings[e.name] = e.value * 60;
            })
            // 次数不需要乘以60
            settings['rounds'] = settings['rounds'] / 60;
            this.settings = settings;
        }
    }
})


