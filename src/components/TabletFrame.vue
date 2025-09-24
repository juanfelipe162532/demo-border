<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ src: string; scale?: number; heightPx?: number }>()
// Para preservar el responsive del hijo, por defecto no escalamos visualmente
const scale = computed(() => props.scale ?? 1)
const containerStyle = computed(() => ({
  '--scale': String(scale.value),
  '--h': (props.heightPx ?? 900) + 'px'
}))
</script>

<template>
  <div class="tablet" :style="containerStyle">
    <div class="tablet__notch" />
    <div class="tablet__screen" :style="{ '--scale': String(scale) }">
      <div class="tablet__scale">
        <iframe class="tablet__iframe" :src="src" />
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.tablet {
  height: min(var(--h, 900px), 95vh);
  aspect-ratio: 3 / 4; /* portrait */
  padding: 16px;
  border: 12px solid #1f2937;
  border-radius: 26px;
  background: linear-gradient(180deg, #0b1220, #111827);
  box-shadow: 0 10px 30px rgba(0,0,0,.35), inset 0 0 30px rgba(255,255,255,.04);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.tablet__notch {
  width: 56px;
  height: 6px;
  background: #0b1220;
  border-radius: 3px;
  margin: 0 auto 10px auto;
  box-shadow: inset 0 1px 2px rgba(255,255,255,.08);
}
.tablet__screen {
  width: 100%;
  height: auto;
  flex: 1 1 auto;
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
  display: grid;
  place-items: center;
}
.tablet__scale {
  width: calc(100% / var(--scale, 0.85));
  height: calc(100% / var(--scale, 0.85));
  transform: scale(var(--scale, 0.85));
  transform-origin: center center;
}
.tablet__iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}
</style>
