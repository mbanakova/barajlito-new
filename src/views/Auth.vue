<template>
	<main class="wrapper">
		<base-popup :show="!!error" @close="gotIt" title="Ошибка доступа">
			<p>{{ serverMessage }}</p>
		</base-popup>
		<base-popup :show="isLoading" title="Authenticating..." fixed>
			<base-spinner></base-spinner>
		</base-popup>

		<base-card>
			<form @submit.prevent="auth">
				<h1>Auth</h1>
				<input type="email" placeholder="email" v-model="email" />
				<input type="password" placeholder="password" v-model="password" />
				<button type="submit" class="base-button base-button--bright">
					{{ submitButtonName }}
				</button>
				<p>
					{{ switchText }}
					<button type="button" @click="switchAuthMode">
						{{ switchButtonName }}
					</button>
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
	name: "Auth",
	data() {
		return {
			email: "",
			password: "",
			serverMessage: "",
			mode: "login",
			error: null,
			isLoading: false,
		};
	},
	computed: {
		submitButtonName() {
			if (this.mode === "login") {
				return "Войти";
			} else {
				return "Зарегистрироваться";
			}
		},
		switchButtonName() {
			if (this.mode === "login") {
				return "Зарегистрироваться";
			} else {
				return "Войти";
			}
		},
		switchText() {
			if (this.mode === "login") {
				return "Впервые на сайте?";
			} else {
				return "Есть аккаунт";
			}
		},
	},
	methods: {
		switchAuthMode() {
			if (this.mode === "login") {
				this.mode = "signup";
				console.log(this.mode + "mode");
			} else {
				this.mode = "login";
				console.log(this.mode + "mode");
			}
		},
		async auth() {
			const authData = {
				email: this.email,
				password: this.password,
			};

			this.isLoading = true;
			try {
				if (this.mode === "login") {
					await this.$store.dispatch("login", authData);
					this.$router.replace("/");
				} else {
					await this.$store.dispatch("signup", authData);
					this.$router.replace("/");
				}
			} catch (error) {
				this.error = error.message;
				this.serverMessage = errors[error.message] || error.message;
			}
			this.isLoading = false;
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
input {
	padding: 5px 10px;
}
</style>
