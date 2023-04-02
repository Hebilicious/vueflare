# Vueflare

## TODO :

- [x] Working POC on miniflare
- [ ] Working deployed POC
- [ ] Add Cloudflare Caching Control
- [ ] Add Hydration islands
- [ ] Add File routing

Opinionated Edge Rendered Vue 3 Micro Framework for Cloudflare Workers to create blazing fast Progressive Web Applications.

- HTML Streaming (Vue PipeToWebstream)
- Cloudflare Workers (Wrangler 2, module syntax)
- Modern Toolchain : Vue 3 + Typescript + Vite
- Isomorphic PWA
- Islands Architecture
- Auto - import, File routing
- Zero Config

## Getting Started

Create a `/islands/Countdown.vue`
This is a client side component.

```vue
<script lang="ts" setup>
const { target } = defineProps<{ target: string }>()
const now = ref(new Date())
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
  if (now.value > target) clearInterval(timer)
})
const secondsLeft = computed(() => Math.floor((target.getTime() - now.value.getTime()) / 1000))
</script>

<template>
  <span v-if="now > target">Done !</span>
  <span v-else> {{ new Intl.RelativeTimeFormat("en-GB").format(secondsLeft, "seconds") }} </span>
</template>
```

Create a dynamic page ...
`/pages/[name].vue`

```vue
<edge lang="ts">
const { request, context, params } = useEdge({ swr: 60 }) // Revalidate every 60 seconds
const data = await fetch("https://name-api.com", params.name) // Named parameters comes from vue-router
const realName = await data.json().name || "Evan"
const response = await context.vueflare({ realName })
response.headers.set("X-Custom-Header", "VueFlare")
return response
</edge>


<script lang="ts" setup>
const { realName } = getEdgeProps() //The props come from context.vueflare() in the edge block
const date = new Date()
date.setHours(date.getHours() + 1)
const target = date.toISOString()
</script>

<template>
  <h1>This name {{ realName }} comes from the Edge !<h1>
  <form>
  <input type="text" name="query" :value="name" />
  <button type="submit">Change Name</button>
  </form>
  <Countdown :target="target" />
</template>
```

### Inspiration

- Vitesse (antfu)
- Iles (https://iles.pages.dev/)
- Fresh (lucacasonato)
- Vite plugin SSR (brillout)
- Serverless PWA React Cloudflare Workers https://blog.cloudflare.com/serverless-pwa-react-cloudflare-workers/
- Flarereact
- Nitro (unjs)
