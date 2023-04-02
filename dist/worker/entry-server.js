import { shallowReadonly, defineComponent, ref, unref, useSSRContext, createSSRApp } from "vue";
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
var escapeRE = /["'&<>]/;
function escapeHtml(string) {
  const str = "" + string;
  const match = escapeRE.exec(str);
  if (!match) {
    return str;
  }
  let html = "";
  let escaped;
  let index;
  let lastIndex = 0;
  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escaped = "&quot;";
        break;
      case 38:
        escaped = "&amp;";
        break;
      case 39:
        escaped = "&#39;";
        break;
      case 60:
        escaped = "&lt;";
        break;
      case 62:
        escaped = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index) {
      html += str.slice(lastIndex, index);
    }
    lastIndex = index + 1;
    html += escaped;
  }
  return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
}
var toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
var replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
var isArray = Array.isArray;
var isMap = (val) => toTypeString(val) === "[object Map]";
var isSet = (val) => toTypeString(val) === "[object Set]";
var isFunction = (val) => typeof val === "function";
var isString = (val) => typeof val === "string";
var isObject = (val) => val !== null && typeof val === "object";
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var isPlainObject = (val) => toTypeString(val) === "[object Object]";
makeMap(`,key,ref,innerHTML,textContent,ref_key,ref_for`);
function ssrInterpolate(value) {
  return escapeHtml(toDisplayString(value));
}
const useEdgeProps = () => {
  console.log("DEBUGFLARE", globalThis.vueflareContext, globalThis.vueflareHasRun, globalThis.vueflareRun, globalThis.vueflareCountRuns);
  return shallowReadonly(globalThis.vueflareContext);
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    console.log("Hello from script setup!");
    const count = ref(0);
    const edgeContext = useEdgeProps();
    console.log("EDGE CONTEXT");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div data-testid="test-div">Hello, World! ${ssrInterpolate(count.value)}</div><hr><pre> ${ssrInterpolate(unref(edgeContext))}</pre><button>Increment</button><!--]-->`);
    };
  }
});
const block0 = (Comp) => {
  globalThis.vueflareHasRun = false;
  globalThis.vueflareCountRuns = 0;
  Comp.edge = (vueflareContext) => {
    {
      console.log(globalThis.vueflareCountRuns);
      globalThis.vueflareContext = vueflareContext;
      const useEdge = () => globalThis.vueflareContext;
      console.log("Hello from edge!");
      const { request, env } = useEdge();
      console.log(request.cf.country);
      return { myContext: { request, env } };
    }
  };
  globalThis.vueflareRun = Comp.edge;
};
if (typeof block0 === "function")
  block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const entryServer = createSSRApp(_sfc_main);
export { entryServer as default };
