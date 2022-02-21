import firebase from "firebase";
const token = localStorage.getItem('token');
const uid = localStorage.getItem('uid');

export default {
  state: {
    users: {
      uid: uid,
      profile: {}
    }
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

        await firebase.database().ref(`/users/${uid}/info`).set({
          ...profile
        })
      } catch (error) {
        console.log(error)
        throw error
      }
      context.commit('updateProfile', profile)
    },
    async fetchProfile(context) {
      const response = await fetch(`https://barahlito-new-default-rtdb.firebaseio.com/users/${uid}.json?auth=${token}`);

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }

      const profileData = {
        email: responseData.auth.email,
        password: responseData.auth.password,
        firstName: responseData.info.firstName,
        imageUrl: responseData.info.imageUrl,
        lastName: responseData.info.lastName,
        userName: responseData.info.userName,
      }

      context.commit('setProfileData', profileData)
    }
  },
  mutations: {
    updateProfile(state, profile) {
      state.users.profile = profile
    },
    setProfileData(state, profileData) {
      state.users.profile = profileData
    }
  },
  getters: {
    profileUserData(state) {
      return state.users.profile;
    }
  }
}