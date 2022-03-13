import firebase from "firebase/app";
import "firebase/storage";
// const token = localStorage.getItem('token');
export default {
  state: {
    lastFetch: null,
    offers: [
      {
        id: 'c1',
        uid: 'fdsfdsg',
        owner: 'John Doe',
        thumbnail: 'https://farm4.static.flickr.com/3321/3673641227_f8388d7548_o.jpg',
        date: '20.02.2022',
        title: 'Дача в Бостоне',
        areas: ['ussr', 'sport', 'books'],
        description:
          "Move right in and enjoy. A wealth of potential in basement as well. ",
        price: 23
      },
      {
        id: 'c2',
        uid: 'fdsdsfdsfbv',
        owner: 'Сталинида Баррикадовна',
        thumbnail: 'https://fwizorek.photo/wp-content/uploads/cities/090502_5S3J9251_Moscow-Stalin-Architecture-Seven-Sisters_1200.jpg',
        date: '22.02.2022',
        title: 'Советская радиоточка',
        areas: ['ussr', 'sport', 'books'],
        description:
          'До сих пор плачу за это удовольствию 265 р в месяц.',
        price: 160
      },
      {
        id: 'c3',
        uid: 'hgfhfhfg',
        owner: 'Zhang Dong Fang',
        thumbnail: 'https://u-stena.ru/upload/iblock/e9d/e9d867d379bd07a2dbcd58e419f72b0b.jpg',
        date: '20.02.2022',
        title: 'Конспект XVII съезда КПСС',
        areas: ['ussr', 'sport', 'books'],
        description:
          'Проходил в Москве с 26 января по 10 февраля 1934 и получил название «Съезд победителей». ',
        price: 12
      }
    ]
  },
  actions: {
    async loadThumbnail(context, thumbnail) {
      let img = thumbnail.name;
      let storageRef = firebase.storage().ref(`thumbnails/${img}`);
      let uploadTask = storageRef.put(thumbnail);

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
            context.commit('loadThumbnail', downloadURL)
          });
        },
      );
    },
    async registerOffer(context, formData) {
      const offerData = {
        uid: formData.uid,
        owner: formData.owner,
        date: formData.date,
        thumbnail: formData.thumbnail,
        title: formData.title,
        description: formData.description,
        areas: formData.areas,
        price: formData.price,
      }
      let token = context.getters.token;
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
    async editOffer(context, formData) {
      const offerData = {
        uid: formData.uid,
        owner: formData.owner,
        date: formData.date,
        thumbnail: formData.thumbnail,
        title: formData.title,
        description: formData.description,
        areas: formData.areas,
        price: formData.price,
      }
      let token = context.getters.token;
      const response = await fetch(`https://barahlito-new-default-rtdb.firebaseio.com/offers/${formData.offerId}.json?auth=${token}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...offerData
        })
      })
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message);
        throw error;
      }

      context.commit('updateOffer', {
        ...offerData
      })
    },
    async fetchOffers(context, payload) {

      if (!payload.forceRefresh && !context.getters.shouldUpdate) {
        return;
      }
      let token = context.getters.token;
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
          owner: responseData[key].owner,
          date: responseData[key].date,
          thumbnail: responseData[key].thumbnail,
          title: responseData[key].title,
          areas: responseData[key].areas,
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
    loadThumbnail(state, thumbnailUrl) {
      state.offers.thumbnail = thumbnailUrl
    },
    registerOffer(state, payload) {
      state.offers.unshift(payload);
    },
    updateOffer(state, payload) {
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
    },
    getThumbnail(state) {
      return state.offers.thumbnail
    },
  },
}