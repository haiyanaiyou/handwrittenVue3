var VueReactivity = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/reactivity/src/index.ts
  var src_exports = {};
  __export(src_exports, {
    reactive: () => reactive
  });

  // packages/shared/src/index.ts
  function isObject(value) {
    return typeof value === "object" && value != null;
  }

  // packages/reactivity/src/reactive.ts
  function reactive(target) {
    return createReactiveObject(target);
  }
  var mutableHandles = {
    // 使用reflect 保证this指向永远指向代理对象
    /*
      Reflect API 是 JavaScript 中的内置对象，提供了获取和设置对象属性值等方法。
      通过使用 Reflect API，Vue 可以确保其对反应对象的访问是一致和快速的，无论使用的是哪种类型的对象（普通对象，Map，Set 等）。
      此外，使用 Reflect API 确保了对象属性的访问以一致的方式处理，使得 Vue 更容易为每种类型的对象提供正确的反应行为。
    */
    get(target, key, receiver) {
      if (key === "__V_isReactive" /* IS_REACTIVE */) {
        return true;
      }
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver);
    }
  };
  var reactiveMap = /* @__PURE__ */ new WeakMap();
  function createReactiveObject(target) {
    if (!isObject(target)) {
      return target;
    }
    if (reactiveMap.get(target)) {
      return reactiveMap;
    }
    if (target["__V_isReactive" /* IS_REACTIVE */]) {
      return target;
    }
    const proxy = new Proxy(target, mutableHandles);
    reactiveMap.set(target, proxy);
    return proxy;
  }
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=reactivity.global.js.map
