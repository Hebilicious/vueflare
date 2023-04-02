<script lang="ts" setup>
const props = defineProps<{ target: string }>()
const target = computed(() => new Date(props.target))

const now = ref(new Date())
const secondsLeft = computed(() =>
  Math.floor((target.value.getTime() - now.value.getTime()) / 1000)
)

let timer
onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})
onUnmounted(() => {
  clearInterval(timer)
})
watch(target, () => {
  if (now.value > target.value) clearInterval(timer)
})
</script>

<template>
  <span v-if="now > target">Done !</span>
  <span v-else> {{ new Intl.RelativeTimeFormat("en-GB").format(secondsLeft, "seconds") }} </span>
</template>
