
// const token = localStorage.getItem('token');
// const uid = localStorage.getItem('uid');
import firebase from "firebase/app";
import "firebase/storage";

export default {
  state: {
    users: {
      profile: {
        avatar: null,
      }
    }
  },

  actions: {
    async loadAvatar(context, avatar) {
      let uid = context.getters.userId;

      let img = avatar.name;
      let extension = img.slice(img.lastIndexOf('.'))
      let storageRef = firebase.storage().ref(`avatars/${uid}${extension}`);
      let uploadTask = storageRef.put(avatar);

      uploadTask.on(
        "state_changed",
        snapshot => {
          console.log(snapshot);
        },
        error => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            context.commit('loadAvatar', downloadURL)
          });
        },
      );
    },
    async updateProfile(context, payload) {
      const profile = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        userName: payload.userName,
        avatar: payload.avatar
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
        avatar: responseData.info.avatar,
      }

      context.commit('setProfileData', profileData)
    }
  },
  mutations: {
    loadAvatar(state, avatarUrl) {
      state.users.profile.avatar = avatarUrl
    },
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
    getAvatar(state) {
      return state.users.profile.avatar
    },
    getUsername(state) {
      return state.users.profile.userName
    }
  }
}