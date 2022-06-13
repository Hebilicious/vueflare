# Vueflare

Edge Rendered Vue 3 Framework for Cloudflare Workers


## Documentation

/islands/Countdown.vue
```vue
<script lang="ts" setup>
const { target } = defineProps<{target: string}>()
const now = ref(new Date())
let timer
onMounted(()=> { timer = setInterval(() => { now.value = new Date() }, 1000) })
onUnmounted(() => { clearInterval(timer) })
watch(target, () => { if(now > target) clearInterval(timer) })
const secondsLeft = computed(() => Math.floor((target.getTime() - now.value.getTime()) / 1000)
<template> 
<span v-if="now > target">Done !</span>
<span v-else>new Intl.RelativeTimeFormat("en-GB").format(secondsLeft, "seconds")</span>
</template>
```
/pages/hello.vue
```vue
<script lang="ts" edge>
const { request, context } = useEdge()
const url = new URL(req.url)
const query = url.searchParams.get("query")
const data = await fetch("name-api.com", query)
const name = await data.json().name || "Evan"
const response = await context.vueflare({ name })
response.headers.set("X-Custom-Header", "VueFlare")
return response
</script>

<script lang="ts" page>
const { name } = defineEdgeProps() 
const date = new Date()
date.setHours(date.getHours() + 1)
const target = date.toISOString()
</script>

<template>
<h1>Hello, {{ name }} <h1>
<form>
<input type="text" name="query" :value="name" />
<button type="submit">Change Name</button>
</form>
<Countdown :target="target" />
</template>
```
