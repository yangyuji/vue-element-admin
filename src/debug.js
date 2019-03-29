import Vue from 'vue'
import { debugReport } from '@/api/debug'

function formatComponentName(vm) {
  if (vm.$root === vm) return 'root'
  const name = vm._isVue
    ? (vm.$options && vm.$options.name) ||
    (vm.$options && vm.$options._componentTag)
    : vm.name
  return (
    (name ? 'component <' + name + '>' : 'anonymous component') +
    (vm._isVue && vm.$options && vm.$options.__file
      ? ' at ' + (vm.$options && vm.$options.__file)
      : '')
  )
}

if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function(err, vm, info) {
    console.log(err, window.location.href)
    const componentName = formatComponentName(vm)
    const propsData = vm.$options && vm.$options.propsData
    debugReport({
      component: componentName,
      props: propsData,
      url: window.location.href,
      err,
      info: info
    })
  }
}
