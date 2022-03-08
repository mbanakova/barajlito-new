import { createStore } from 'vuex'
import auth from './auth'
import profile from './profile'
import offers from './offers'
import requests from './requests'

export default createStore({
  state: {
    error: null,
    burger: false
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
    burgerToggle(state) {
      state.burger = !state.burger
    }
  },
  actions: {

  },
  getters: {
    error(state) {
      return state.error
    },
    burger(state) {
      return state.burger
    }
  },
  modules: {
    auth, profile, offers, requests
  }
})
