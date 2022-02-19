<template>
	<base-popup :show="!!error" @close="gotIt">
		<p>{{ serverMessage }}</p>
	</base-popup>
	<main class="">
		<h1>Login</h1>
		<input type="email" placeholder="email" v-model="email" />
		<input type="password" placeholder="password" v-model="password" />
		<button @click="login">Login</button>
		<p>
			Нет аккаунта? <router-link to="/signup">Зарегистрироваться</router-link>
		</p>
	</main>
</template>

<script>
import errors from "@/messages/errors";

export default {
	name: "Login",
	data() {
		return {
			email: "",
			password: "",
			initials: "",
			serverMessage: "",
			error: null,
		};
	},
	methods: {
		async login() {
			const authData = {
				email: this.email,
				password: this.password,
			};
			try {
				await this.$store.dispatch("login", authData);
				this.$router.replace("/");
			} catch (error) {
				this.error = true;
				this.serverMessage = errors[error.code] || "Ошибка";
				throw error;
			}
		},
		gotIt() {
			this.error = false;
		},
	},
};
</script>
<style></style>
