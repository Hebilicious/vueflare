<template>
  <div data-testid="test-div">Hello, World! {{ count }}</div>
  <hr />
  <pre> {{ edgeContext }}</pre>
  <button @click="increment">Increment</button>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useEdgeProps } from "./vueflare"
console.log("Hello from script setup!")
const count = ref(0)
const edgeContext = useEdgeProps()
console.log("EDGE CONTEXT")
const increment = () => {
  console.log("Hello from increment!")
  count.value++
}
</script>

<edge lang="ts">
console.log("Hello from edge!")
const { request, env } = useEdge()
console.log(request.cf.country)
const a = 1
return { myContext: { request, env } }
</edge>
