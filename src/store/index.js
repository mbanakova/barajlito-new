import { createStore } from 'vuex'
import auth from './auth'
import profile from './profile'
import offers from './offers'

export default createStore({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
  },
  getters: {
    error(state) {
      return state.error
    }
  },
  modules: {
    auth, profile, offers
  }
})
