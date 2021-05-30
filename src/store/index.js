import Vue from 'vue'
import Vuex from 'vuex'
import citiesModule from './citiesModule';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cities: citiesModule
  }
})
