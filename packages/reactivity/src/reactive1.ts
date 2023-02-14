import {isObject} from '@vue/shared'
export function reactive(target) {
  // reactive 主要是生成一个响应式对象
  /*
      reactive 主要注意两个点：
      1、过滤已经代理过的(如果对象已经被代理过，再次重复代理则返回上次代理结果)
      2、避免被重复调用多次(一个代理对象传入)
  */ 
  return createReactiveObject(target)
}

const enum ReactiveFlags {
  IS_REACTIVE = '__V_isReactive'
}

const mutableHandles: ProxyHandler<object>= {
// 使用reflect 保证this指向永远指向代理对象
/*
  Reflect API 是 JavaScript 中的内置对象，提供了获取和设置对象属性值等方法。
  通过使用 Reflect API，Vue 可以确保其对反应对象的访问是一致和快速的，无论使用的是哪种类型的对象（普通对象，Map，Set 等）。
  此外，使用 Reflect API 确保了对象属性的访问以一致的方式处理，使得 Vue 更容易为每种类型的对象提供正确的反应行为。
*/ 
  get(target, key, receiver){
    if(key === ReactiveFlags.IS_REACTIVE) {
      return true
    }
    return Reflect.get(target, key, receiver)
  },
  set(target,key,value, receiver){
    return Reflect.set(target,key,value,receiver)
  }
}

const reactiveMap = new WeakMap();

function createReactiveObject(target) {
  // 首先，必须是一个对象
  if(!isObject(target)) {
    return target
  }
  // 已经代理过直接返回代理过的对象
  const existingRroxy = reactiveMap.get(target)
  if(existingRroxy) {
    return existingRroxy
  }
  // 如果已经是响应式对象，则直接取值
  if(target[ReactiveFlags.IS_REACTIVE]) {
    return target
  }
  const proxy = new Proxy(target, mutableHandles)
  reactiveMap.set(target, proxy)
  return proxy
}
