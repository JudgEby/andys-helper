import {createApp} from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import {v4 as uuidv4} from 'uuid';
import App from './ContentBtn.vue'

const app = document.createElement('div')
const id = uuidv4()
app.id = id
document.body.append(app)

createApp(App).use(BootstrapVue3).mount(`[id="${id}"]`)
