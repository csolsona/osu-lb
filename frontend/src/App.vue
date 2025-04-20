<script setup lang="ts">
import { ref } from 'vue';

const apiData = ref();

async function fetchData() {
  const res = await fetch('/api/hello');
  apiData.value = await res.json();
}
</script>

<template>
  <h1>Frontend Vue + Bun</h1>
  <button @click="fetchData">API Request</button>
  <pre v-if="apiData">{{ apiData }}</pre>
</template>