<edge lang="ts">
const { request, context } = useEdge()
const url = new URL(req.url)
const query = url.searchParams.get("query")
const data = await fetch("name-api.com", query)
const name = (await data.json().name) || "Evan"
const response = await context.vueflare({ name })
response.headers.set("X-Custom-Header", "VueFlare")
return response
</edge>

<script lang="ts" setup>
import Countdown from "../islands/Countdown.vue"
const { name } = defineEdgeProps()
const date = new Date()
date.setHours(date.getHours() + 1)
const target = date.toISOString()
</script>

<template>
  <h1>Hello, {{ name }}</h1>
  <form>
    <input type="text" name="query" :value="name" />
    <button type="submit">Change Name</button>
  </form>
  <Countdown :target="target" />
</template>
