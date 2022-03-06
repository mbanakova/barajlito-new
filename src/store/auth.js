// import firebase from "firebase";
const API_KEY = 'AIzaSyAifkgZ7dSMH29s0Fln77zehXTqvkHQaro';
let timer;

export default {
  state: {
    user: {
      uid: null,
      token: null,
      didAutoLogout: false,
      isLoggedIn: false,
      credentials: {}
    }
  },
  actions: {
    async auth(context, payload) {
      const mode = payload.mode;
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

      if (mode === 'signup') {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      })

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.error.message)
        throw error
      }

      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('token', responseData.idToken)
      localStorage.setItem('uid', responseData.localId)
      localStorage.setItem('tokenExpiration', expirationDate)

      timer = setTimeout(function () {
        context.dispatch('autoLogout')
      }, expiresIn);



      context.commit('setUser', {
        token: responseData.idToken,
        uid: responseData.localId
      })
    },
    async login(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'login'
      })
    },
    async signup(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'signup'
      })
    },

    async saveAuthData(context, payload) {
      const uid = context.getters.userId;
      const token = context.getters.token;

      const credentials = {
        email: payload.email,
        password: payload.password,
      }

      const response = await fetch(`https://barahlito-new-default-rtdb.firebaseio.com/users/${uid}/auth.json?auth=${token}`, {
        method: 'PUT',
        body: JSON.stringify({ ...credentials })
      })

      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message);
        throw error;
      }
      context.commit('saveAuthData', { ...credentials })
    },
    tryLogin(context) {
      const token = localStorage.getItem('token');
      const uid = localStorage.getItem('uid');
      const tokenExpiration = localStorage.getItem('tokenExpiration');

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) {
        return
      }

      timer = setTimeout(function () {
        context.dispatch('autoLogout')
      }, expiresIn)

      if (token && uid) {
        context.commit('setUser', {
          token: token,
          uid: uid
        })
      }
    },

    logout(context) {
      localStorage.removeItem('token')
      localStorage.removeItem('uid')
      localStorage.removeItem('tokenExpiration')

      clearTimeout(timer);

      context.commit('setUser', {
        uid: null,
        token: null
      })
      context.commit('autoLogout');
    },
    autoLogout(context) {
      context.dispatch('logout')
      // исправлено (autologout added)
      context.commit('autoLogout')
    },
    // getUserID() {
    //   const user = firebase
    //     .auth().currentUser
    //   return user ? user.uid : null
    // }
  },
  mutations: {
    setUser(state, payload) {
      state.user.uid = payload.uid;
      state.user.token = payload.token;
      state.user.didAutoLogout = false;
      state.user.isLoggedIn = true;
    },
    autoLogout(state) {
      state.user.didAutoLogout = true;
      state.user.isLoggedIn = false;
    },
    saveAuthData(state, payload) {
      state.user.credentials = payload;
    }
  },
  getters: {
    userId(state) {
      return state.user.uid;
    },
    token(state) {
      return state.user.token
    },
    isAuthenticated(state) {
      return !!state.user.token
    },
    isLoggedIn(state) {
      return !!state.user.isLoggedIn
    },
    didAutoLogout(state) {
      return state.user.didAutoLogout
    },
    getCredentials(state) {
      return state.user.credentials
    }
  },
}