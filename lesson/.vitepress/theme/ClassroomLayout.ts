import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ClassroomControls from './ClassroomControls.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(ClassroomControls)
    })
  }
}
