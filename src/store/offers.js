// import firebase from "firebase";


export default {
  state: {
    offers: [
      {
        id: 'c1',
        uid: 'fdsfdsg',
        owner: 'John Doe',
        date: '20.02.2022',
        title: 'Дача в Бостоне',
        description:
          "Move right in and enjoy. A wealth of potential in basement as well. ",
        price: 23
      },
      {
        id: 'c2',
        uid: 'fdsdsfdsfbv',
        owner: 'Сталинида Баррикадовна',
        date: '22.02.2022',
        title: 'Советская радиоточка',
        description:
          'До сих пор плачу за это удовольствию 265 р в месяц.',
        price: 160
      },
      {
        id: 'c3',
        uid: 'hgfhfhfg',
        owner: 'Zhang Dong Fang',
        date: '20.02.2022',
        title: 'Конспект XVII съезда КПСС',
        description:
          'Проходил в Москве с 26 января по 10 февраля 1934 и получил название «Съезд победителей». ',
        price: 12
      }
    ]
  },
  actions: {
    // async loadOffers(context, payload) {
    //   if (!payload.forceRefresh && !context.getters.shouldUpdate) {
    //     return;
    //   }
    //   const token = localStorage.getItem('token');
    //   const response = await fetch(`https://barahlito-bc730-default-rtdb.firebaseio.com/offers.json?auth=${token}`);

    //   const responseData = await response.json();

    //   if (!response.ok) {
    //     const error = new Error(responseData.message || 'Failed to fetch!');
    //     throw error;
    //   }

    //   const offers = [];

    //   for (const key in responseData) {
    //     const offer = {
    //       id: key,
    //       user: responseData[key].user,
    //       date: responseData[key].date,
    //       title: responseData[key].title,
    //       thumbnail: responseData[key].thumbnail,
    //       description: responseData[key].description,
    //       price: responseData[key].price,
    //       areas: responseData[key].areas,
    //     }
    //     offers.push(offer)
    //   }

    //   // данные для OffersList.vue, обновляют список из firebase
    //   context.commit('setOffers', offers)
    //   context.commit('setFetchTimestamp')
    // }
    registerOffer(context, formData) {
      const offerData = {
        id: new Date().toISOString(),
        uid: formData.uid,
        date: formData.date,
        // owner: formData.,
        title: formData.title,
        description: formData.description,
        price: formData.price,
      }

      context.commit('registerOffer', offerData)
    }
  },
  mutations: {
    registerOffer(state, payload) {
      state.offers.unshift(payload)
    }
  },
  getters: {
    offers(state) {
      return state.offers;
    },
    hasOffers(state) {
      return (state.offers && state.offers.length > 0);
    },
    isOffer(_, getters, _2, rootGetters) {
      const offers = getters.offers;
      const userId = rootGetters.userId;
      return offers.some(offer => offer.id === userId)
    },
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        return true
      }
      const currentTimeStamp = new Date().getTime();
      return (currentTimeStamp - lastFetch) / 1000 > 60;
    }
  },
}