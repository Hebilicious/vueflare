<template>
  <div data-testid="test-div">Hello, World! {{ b }}</div>
</template>

<script lang="ts" setup>
console.log("Hello from script setup!")
const b = 2
</script>

<edge lang="ts">
console.log("Hello from edge!")
const a = 1
</edge>
