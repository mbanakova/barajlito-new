<template>
	<base-popup :show="!!error" @close="gotIt">
		<p>{{ serverMessage }}</p>
	</base-popup>
	<main class="wrapper">
		<base-card>
			<form @submit.prevent="signUp">
				<h1>Sign Up</h1>
				<input type="email" placeholder="email" v-model="email" />
				<input type="password" placeholder="password" v-model="password" />
				<button type="submit">Sign Up</button>
				<p>
					Уже зарегистрированы? <router-link to="/login">Войти</router-link>
				</p>
			</form>
		</base-card>
	</main>
</template>

<script>
import errors from "@/messages/errors";
import BasePopup from "@/components/UI/BasePopup.vue";
import BaseCard from "@/components/UI/BaseCard.vue";

export default {
	components: { BasePopup, BaseCard },
	name: "SignUp",
	data() {
		return {
			email: "",
			password: "",
			serverMessage: "",
			error: null,
		};
	},
	methods: {
		async signUp() {
			const authData = {
				email: this.email,
				password: this.password,
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

form {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
}
</style>
