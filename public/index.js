import Vue from 'vue'
import VueFormWizard from 'vue-form-wizard'
import VueFormGenerator from 'vue-form-generator'
import index from './components/index.vue'


Vue.use(VueFormWizard)
Vue.use(VueFormGenerator)
console.log(index)
new Vue({
  el: '#app',
  template: '<index/>',
  components: { index }
})
