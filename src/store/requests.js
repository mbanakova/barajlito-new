export default {
  state() {
    return {
      requests: []
    }
  },

  actions: {
    async contactOwner(context, payload) {
      const newRequest = {
        // id: new Date().toISOString(),
        time: new Date().toLocaleString(),
        title: payload.title,
        thumbnail: payload.thumbnail,
        userName: payload.userName,
        message: payload.message,
      }
      let token = context.getters.token;

      const response = await fetch(`https://barahlito-new-default-rtdb.firebaseio.com/requests/${payload.owner}.json?auth=${token}`, {
        method: 'POST',
        body: JSON.stringify({
          ...newRequest
        })
      })
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }

      newRequest.id = responseData.name;
      newRequest.ownerId = payload.ownerId;

      context.commit('addRequest', newRequest)
    },

    async fetchRequests(context) {
      const userId = context.getters.userId;
      let token = context.getters.token;

      const response = await fetch(`https://barahlito-new-default-rtdb.firebaseio.com/requests/${userId}.json?auth=${token}`);
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }


      const requests = [];

      for (const key in responseData) {
        const request = {
          id: key,
          ownerId: userId,
          thumbnail: responseData[key].thumbnail,
          time: responseData[key].time,
          title: responseData[key].title,
          userName: responseData[key].userName,
          message: responseData[key].message,
        }
        requests.unshift(request)
      }

      context.commit('fetchRequests', requests)
    }
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.unshift(payload)
    },
    fetchRequests(state, payload) {
      state.requests = payload
    }
  },
  getters: {
    requests(state, getters) {
      const userId = getters.userId;
      return state.requests.filter(request => request.ownerId === userId)
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests.length > 0;
    }
  },
}
