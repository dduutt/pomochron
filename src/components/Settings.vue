<template>
  <v-container class="d-flex justify-center fill-height flex-column justify-space-around">
    <div v-for="setting in settings" :key="setting.name" style="width: 100%;">
      <div class="text-caption">
        {{ setting.label }}
      </div>
      <v-slider :color="setting.color" v-model="setting.value" :min="1" :max="90" :step="1" hide-details>
        <template v-slot:append>
          <div class="text-center" style="width: 40px">{{ setting.value }}</div>
        </template>
      </v-slider>
    </div>
    <div class="d-flex justify-space-around">
      <v-btn color="gray" variant="text" @click="loadSettings">Cancel</v-btn>
      <v-btn color="red" variant="text" @click="setDefault">Defaults</v-btn>
      <v-btn color="blue" variant="text" @click="save">Save</v-btn>
    </div>
  </v-container>
</template>

<script>
import { useSettingsStore } from '@/stores/settings'
import { useTimerStore } from '@/stores/timer'
import { mapActions, mapState } from 'pinia'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions(useSettingsStore, ['loadSettings', 'saveSettings', 'setDefault']),
    ...mapActions(useTimerStore, ['initTimer']),
    save() {
      this.saveSettings(this.settings)
      this.initTimer()
    }
  },
  mounted() {
    this.loadSettings()
  },
  computed: {
    ...mapState(useSettingsStore, ['settings'])
  }

}

</script>