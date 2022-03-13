import { createApp, defineAsyncComponent } from 'vue'
import VueMask from '@devindex/vue-mask';
import App from './App.vue'
import router from './router'
import store from './store'
// import BasePopup from './components/UI/BasePopup'
import BaseButton from './components/UI/BaseButton'
import BaseCard from './components/UI/BaseCard'
import BaseSpinner from './components/UI/BaseSpinner'
import BaseBadge from './components/UI/BaseBadge'
import FontAwesome from "./assets/fontawesome";
// import './assets/global.scss';
import firebase from "firebase/app";

const BasePopup = defineAsyncComponent(() => import('./components/UI/BasePopup'))

const firebaseConfig = {
  apiKey: "AIzaSyAifkgZ7dSMH29s0Fln77zehXTqvkHQaro",
  authDomain: "barahlito-new.firebaseapp.com",
  projectId: "barahlito-new",
  storageBucket: "barahlito-new.appspot.com",
  messagingSenderId: "647453893208",
  appId: "1:647453893208:web:359eb03ef4b48d7b6b202d",
  measurementId: "G-X3EGHEHZ3P",
};

firebase.initializeApp(firebaseConfig);

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueMask);
app.component('font-awesome', FontAwesome)
app.component('base-popup', BasePopup)
app.component('base-button', BaseButton)
app.component('base-spinner', BaseSpinner)
app.component('base-card', BaseCard)
app.component('base-badge', BaseBadge)

app.mount("#app")