<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center">
      <v-img height="200" src="@/assets/logo.png" v-show="show" />
      <v-img height="200" src="@/assets/pay.png" v-show="!show" />
      <p class="text-body-2 text-start font-weight-bold">
        Pomochron是一款使用Tauri开发的跨平台番茄钟应用，旨在帮助您提高时间管理能力和专注力。
        Pomochron提供简洁直观的界面和灵活的定制选项，在完成番茄工作周期设置后，
        Pomochron会提醒您何时开始和结束每个番茄工作周期，帮助您更好地管理时间、提高效率，并在工作和休息之间保持平衡。
      </p>

      <v-btn color="amber-darken-3" class="mb-n1" variant="text" @click="pay">
        <div>
          <v-icon>{{ mdiCoffeeOutline }}</v-icon>
          <span>请我喝杯咖啡</span>
        </div>
      </v-btn>

      <v-btn color="success" class="mb-n1" variant="text" @click="star">
        <div>
          <v-icon>{{ mdiThumbUpOutline }}</v-icon>
          <span>给我点赞</span>
        </div>
      </v-btn>

    </v-responsive>
  </v-container>
</template>

<script setup>
import { WebviewWindow } from '@tauri-apps/api/window';
import { mdiCoffeeOutline, mdiThumbUpOutline } from '@mdi/js';
import { ref } from 'vue';

const show = ref(true);

const pay = () => {
  show.value = !show.value;
};

const star = () => {
  const webview = WebviewWindow.getByLabel('star');
  if (!!webview) {
    webview.unminimize();
    webview.setFocus();
    return;
  }
  new WebviewWindow('star', {
    url: 'https://github.com/dduutt/pomochron',
  }).once('tauri://error', (e) => {
    console.log(e);
  });
};
</script>
