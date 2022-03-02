
// const token = localStorage.getItem('token');
// const uid = localStorage.getItem('uid');

export default {
  state: {
    users: {
      profile: {}
    }
  },

  actions: {
    async updateProfile(context, payload) {
      const profile = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        userName: payload.userName
      }
      let token = context.getters.token;
      let uid = context.getters.userId;
      const response = await fetch(`https://barahlito-new-default-rtdb.firebaseio.com/users/${uid}/info.json?auth=${token}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...profile
        })
      })
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }

      context.commit('updateProfile', profile)
    },
    async fetchProfile(context) {
      let token = context.getters.token;
      let uid = context.getters.userId;
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
    },

  }
}