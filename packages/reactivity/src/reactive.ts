import { isObject } from "@vue/shared"

export function reactive(target) {
  return createReactiveObject(target)
}

const reactiveMap = new WeakMap()
const enum ReactiveFlags {
  IS_REACTIVE = 'is__reactive'
}
const mutationHandler = {
  // Reflect的使用是为了确保this的正确使用
  get(target, key, receiver) {
    // 如果读取到key 的属性名是ReactiveFlags.IS_REACTIVE, 说明是proxy代理对象，直接返回
    if(key === ReactiveFlags.IS_REACTIVE) {
      return true
    }
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    return Reflect.set(target, key, value, receiver)
  }
}

function createReactiveObject(target){
  // 首先判别必须是一个对象
  if(!isObject(target)) {
    return target
  }

  // 已经代理过的直接读取
  const existingProxy = reactiveMap.get(target)
  if(existingProxy) {
    return existingProxy
  }

  // 先读取识别，传入的是不是proxy对象(vue2中使用栈进行处理)
  if(target[ReactiveFlags.IS_REACTIVE]) {
    return target
  }

  const proxy = new Proxy(target, mutationHandler)
  // 没有代理过的缓存在reactiveMap中
  reactiveMap.set(target, proxy)
  return proxy
}