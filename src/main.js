import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

// Icons and Styles
import './assets/main.pcss'
import FontAwesomePlugin from './plugins/FontAwesome'
import PiniaHistoryPlugin from './plugins/PiniaHistoryPlugin'

// App Wide Components
import AppButton from './components/AppButton.vue'
import AppCountInput from './components/AppCountInput.vue'
import AppModalOverlay from './components/AppModalOverlay.vue'

// Init App
const pinia = createPinia()
pinia.use(PiniaHistoryPlugin)

createApp(App)
  .use(pinia)
  .use(FontAwesomePlugin)
  .component('AppButton', AppButton)
  .component('AppCountInput', AppCountInput)
  .component('AppModalOverlay', AppModalOverlay)
  .mount('#app')
