// plugins/clickOutside.ts
import { defineNuxtPlugin } from '#app'

//vue directive that when applied to a certain div will check if a user clicks inside or outside that div. If the user clicks outside then it calls a given function.
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('click-outside', {
        mounted(el, binding) {
            binding.event = function(event) {
                if (!(el === event.target || el.contains(event.target))) {
                    if (binding.value instanceof Function) {
                        binding.value(event)
                    }
                }
            }
            document.body.addEventListener('click', binding.event)
        },
        unmounted(el, binding) {
            document.body.removeEventListener('click', binding.event)
        }
    })
});
