<template>
	<base-popup :show="!!error" @close="gotIt">
		<p>{{ serverMessage }}</p>
	</base-popup>
	<main class="">
		<form @submit.prevent="signUp">
			<h1>Sign Up</h1>
			<input type="email" placeholder="email" v-model="email" />
			<input type="password" placeholder="password" v-model="password" />
			<!-- <input type="text" placeholder="First name" v-model="firstName" />
			<input type="text" placeholder="Last Name" v-model="lastName" />
			<input type="text" placeholder="Pick up username" v-model="userName" /> -->
			<button type="submit">Sign Up</button>
			<p>Уже зарегистрированы? <router-link to="/login">Войти</router-link></p>
		</form>
	</main>
</template>

<script>
import errors from "@/messages/errors";
import BasePopup from "../components/UI/BasePopup.vue";

export default {
	components: { BasePopup },
	name: "SignUp",
	data() {
		return {
			email: "",
			password: "",
			// firstName: "",
			// lastName: "",
			// userName: "",
			serverMessage: "",
			error: null,
		};
	},
	methods: {
		async signUp() {
			const authData = {
				email: this.email,
				password: this.password,
				// firstName: this.firstName,
				// lastName: this.lastName,
				// userName: this.userName,
			};
			try {
				await this.$store.dispatch("register", authData);
				this.$router.replace("/");
			} catch (error) {
				this.error = true;
				this.serverMessage = errors[error.code] || "Ошибка";
				throw error;
			}
		},
		gotIt() {
			this.error = null;
		},
	},
};
</script>
<style lang="scss" scoped>
.popup {
	padding: 20px;
	background-color: #f0caca;
}
</style>
