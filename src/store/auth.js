import firebase from "firebase";

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
      } catch (error) {
        console.log(error)
        throw error
      }
      console.log(dispatch, commit)
    },
    async logout() {
      await firebase
        .auth()
        .signOut()
    },
    async register({ dispatch, commit }, { email, password, firstName, lastName, userName }) {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUserID')
        await firebase.database().ref(`/users/${uid}/info`).set({
          firstName,
          lastName,
          userName,
        })
      } catch (error) {
        console.log(error)
        throw error
      }
      console.log(commit)
    },
    getUserID() {
      const user = firebase
        .auth().currentUser
      return user ? user.uid : null
    }
  },
  getters: {
  },
}