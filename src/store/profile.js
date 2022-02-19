import firebase from "firebase";


export default {
  state: {
    users: {
      uid: '',
      avatar: ''
    }
  },
  mutations: {
  },
  actions: {
    async updateProfile(context, payload) {
      const profile = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        userName: payload.userName,
        imageUrl: payload.imageUrl,
      }
      try {
        const uid = await context.dispatch('getUserID')
        await firebase.database().ref(`/users/${uid}/info`).set({
          ...profile
        })
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  },
  getters: {
  },
}