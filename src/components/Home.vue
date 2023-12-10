<template>
  <v-container class="d-flex justify-center fill-height flex-column justify-space-around bg-blue-grey-darken-3">
    <div class="d-flex">
      <v-progress-circular bg-color="blue-grey-lighten-1" :size="250" :width="20" :model-value="circular"
        :color="isFocusTimer ? 'orange-darken-3' : 'green-darken-2'">
        <template v-slot:default>
          <v-container class="d-flex justify-center fill-height flex-column justify-space-around">
            <div class="text-h3">{{ formatTime }}</div>
            <div>{{ isFocusTimer ? "Focus" : "Break" }}</div>

          </v-container></template>
      </v-progress-circular>
    </div>
    <v-btn color="blue-grey-darken-4" @click="btnClick" :icon="icon"></v-btn>
    <div class="d-flex justify-space-around" style="width: 100%;">
      <div class="d-flex align-center text-center text-h4">{{ progress }}</div>
      <v-btn variant="text" :icon="mdiRestore" @click="initTimer"></v-btn>
      <v-btn variant="text" :icon="mdiSkipForward" @click="nextTimer"></v-btn>
    </div>
    <audio id="audio" :src="audio_path" type="audio/ogg"></audio>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapWritableState } from 'pinia'
import { useTimerStore } from '@/stores/timer'
import { useSettingsStore } from '@/stores/settings'
import { mdiRestore, mdiSkipForward, mdiPause, mdiPlay } from '@mdi/js'



import audio from '@/assets/alarm03.ogg'

export default {

  data() {
    return {
      audio_path: audio,
      mdiRestore,
      mdiSkipForward,
      mdiPause,
      mdiPlay
    }
  },
  methods: {
    ...mapActions(useTimerStore, ['startTimer', 'stopTimer', 'initTimer', 'nextTimer']),
    btnClick() {
      this.isPlay = !this.isPlay
      this.isPlay ? this.startTimer() : this.stopTimer();

    },
  },
  computed: {
    ...mapState(useTimerStore, ['progress', 'formatTime', 'isFocusTimer', 'circular', 'settings']),
    ...mapWritableState(useTimerStore, ['isPlay']),

    icon() {
      return this.isPlay ? mdiPause : mdiPlay
    }

  },

  mounted() {
    useSettingsStore().loadSettings()
    // 判断是否首次加载
    if (this.settings.length === 0) {
      this.initTimer()
    }
  }
}
</script>
