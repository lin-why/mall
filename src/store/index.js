import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import modulesA from './modules/modulesA'
const state ={
  cartList: []
}
Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    modulesA
  }
  
})



export default store