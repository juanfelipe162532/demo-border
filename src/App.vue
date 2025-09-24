<script setup lang="ts">
import { ref, computed } from 'vue'
import DeviceFrame from './components/DeviceFrame.vue'

type Device = 'desktop' | 'tablet' | 'mobile'

const childUrl = import.meta.env.VITE_CHILD_URL || 'https://dev.d2z9gq8li1mqrp.amplifyapp.com/'

const selected = ref<Device>('desktop')
const isFullscreen = ref(false)

const title = computed(() => {
  switch (selected.value) {
    case 'desktop': return 'PC'
    case 'tablet': return 'Tablet'
    case 'mobile': return 'Celular'
  }
})

function pick(device: Device) {
  selected.value = device
  if (isFullscreen.value) {
    isFullscreen.value = false
  }
}

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
}
</script>

<template>
  <main class="container">
    <div class="floating-controls" role="toolbar" aria-label="Selector de dispositivo">
      <button class="btn btn-icon" :class="{ active: selected === 'desktop' }" @click="pick('desktop')"
        aria-label="Vista PC">
        <svg width="20" height="16" viewBox="0 0 24 20" fill="currentColor">
          <path
            d="M21 2H3c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h6l-2 2v1h8v-1l-2-2h6c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 11H3V4h18v9z" />
        </svg>
      </button>
      <button class="btn btn-icon" :class="{ active: selected === 'tablet' }" @click="pick('tablet')"
        aria-label="Vista Tablet">
        <svg width="16" height="20" viewBox="0 0 16 24" fill="currentColor">
          <path
            d="M13 1.01L3 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM13 19H3V5h10v14z" />
        </svg>
      </button>
      <button class="btn btn-icon" :class="{ active: selected === 'mobile' }" @click="pick('mobile')"
        aria-label="Vista Celular">
        <svg width="14" height="20" viewBox="0 0 14 24" fill="currentColor">
          <path
            d="M10 1.01L4 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM10 19H4V5h6v14z" />
        </svg>
      </button>
      <button class="btn btn-full" :class="{ active: isFullscreen }" @click="toggleFullscreen"
        aria-label="Pantalla completa">FULL</button>
    </div>

    <div v-if="!isFullscreen" class="panel dynamic-border">
      <DeviceFrame :src="childUrl" :device="selected" />
    </div>

    <div v-else class="fullscreen-frame">
      <iframe :src="childUrl" class="fullscreen-iframe" />
    </div>
  </main>
</template>

<style scoped>
.container {
  min-height: 100dvh;
  display: grid;
  justify-content: center;
  align-content: start;
  gap: 16px;
  padding: 28px;
  background: #f8fafc;
  color: #111827;
}

.heading {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
}

.panel {
  position: relative;
  width: min(100%, 1080px);
  display: grid;
  gap: 16px;
  border-radius: 16px;
  background: #ffffff;
  padding: 16px;
  box-shadow: 0 10px 30px rgba(2, 6, 23, .08);
}




.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.btns {
  display: flex;
  gap: 8px;
}

.btn {
  appearance: none;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #0f172a;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease, color .15s ease;
}

.btn:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}

.btn.active {
  background: #0ea5e9;
  color: #ffffff;
  border-color: #0284c7;
}

/* Floating toolbar at bottom-right */
.floating-controls {
  position: fixed;
  bottom: 12px;
  right: 12px;
  z-index: 1000;
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 6px 18px rgba(2, 6, 23, .12);
  backdrop-filter: saturate(1.1) blur(4px);
}

/* Fullscreen styles */
.fullscreen-frame {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background: #fff;
}

.fullscreen-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

/* Style for icon buttons */
.btn-icon {
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon svg {
  transition: color .15s ease;
}

/* Style for FULL button */
.btn-full.active {
  background: #dc2626;
  color: #ffffff;
  border-color: #b91c1c;
}
</style>
