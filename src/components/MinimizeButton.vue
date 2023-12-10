<template>
    <v-btn variant="text" :icon="mdiMinus" @click="minimizeToTray">
    </v-btn>
</template>
  
<script setup>
import { appWindow } from '@tauri-apps/api/window'
import { mdiMinus } from '@mdi/js'

function minimizeToTray() {
    appWindow.hide()
}
</script>
  