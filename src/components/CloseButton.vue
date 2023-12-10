<template>
    <v-btn :icon="mdiClose" @click="closeApp"></v-btn>
</template>
  
<script setup>
import { appWindow } from '@tauri-apps/api/window';
import { mdiClose } from '@mdi/js';

function closeApp() {
    appWindow.close();
}

</script>
  