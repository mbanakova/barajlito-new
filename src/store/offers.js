// import firebase from "firebase";

const token = localStorage.getItem('token');
export default {
  state: {
    lastFetch: null,
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
    async registerOffer(context, formData) {
      const offerData = {
        uid: formData.uid,
        date: formData.date,
        title: formData.title,
        description: formData.description,
        price: formData.price,
      }

      const response = await fetch(`https://barahlito-new-default-rtdb.firebaseio.com/offers.json?auth=${token}`, {
        method: 'POST',
        body: JSON.stringify({
          ...offerData
        })
      })
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }

      context.commit('registerOffer', {
        ...offerData
      })
    },
    async fetchOffers(context, payload) {

      if (!payload.forceRefresh && !context.getters.shouldUpdate) {
        return;
      }

      const response = await fetch(`https://barahlito-new-default-rtdb.firebaseio.com/offers.json?auth=${token}`);

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }

      const offers = [];

      for (const key in responseData) {
        const offer = {
          id: key,
          uid: responseData[key].uid,
          date: responseData[key].date,
          title: responseData[key].title,
          description: responseData[key].description,
          price: responseData[key].price
        }
        offers.unshift(offer)
      }

      // данные для OffersList.vue, обновляют список из firebase
      context.commit('setOffers', offers)
    }
  },
  mutations: {
    registerOffer(state, payload) {
      state.offers.unshift(payload);
    },
    setOffers(state, fetchedOffers) {
      state.offers = fetchedOffers;
    }
  },
  getters: {
    offers(state) {
      return state.offers;
    },
    hasOffers(state) {
      return (state.offers && state.offers.length > 0);
    },
    myOffers(state, getters) {
      const userId = getters.userId;
      return state.offers.filter(offer => offer.uid === userId)
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