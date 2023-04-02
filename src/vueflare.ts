import { shallowReadonly } from "vue";
export const useEdgeProps = () => {
	console.log(
		"DEBUGFLARE",
		globalThis.vueflareContext,
		globalThis.vueflareHasRun,
		globalThis.vueflareRun,
		globalThis.vueflareCountRuns,
	);
	return shallowReadonly(globalThis.vueflareContext);
};
