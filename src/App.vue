<template>
  <v-app class="bg-blue-grey-darken-3">
    <v-app-bar :elevation="0" color="blue-grey-darken-3" density="compact">
      <v-app-bar-title>
        <div data-tauri-drag-region>Pomochron</div>
      </v-app-bar-title>
      <template v-slot:append>
        <minimize-button></minimize-button>
        <close-button></close-button>
      </template>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-bottom-navigation grow :elevation="0" class="bg-blue-grey-darken-3">
      <v-btn variant="plain" to="/" exact>
        <v-icon>{{ mdiHome }}</v-icon>
        <span>Home</span>
      </v-btn>
      <v-btn variant="plain" to="/settings">
        <v-icon>{{ mdiCogs }}</v-icon>
        <span>Settings</span>
      </v-btn>
      <v-btn variant="plain" to="/about">
        <v-icon>{{ mdiInformation }}</v-icon>
        <span>About</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup>
import MinimizeButton from './components/MinimizeButton.vue';
import CloseButton from './components/CloseButton.vue';
import { mdiInformation, mdiCogs, mdiHome } from '@mdi/js';


</script>

<style></style>
