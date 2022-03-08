<template>
	<div class="container">
		<Canvas />
		<main class="wrapper">
			<base-popup :show="!!error" @close="gotIt" title="Ошибка доступа">
				<p>{{ serverMessage }}</p>
			</base-popup>
			<base-popup :show="isLoading" title="Authenticating..." fixed>
				<base-spinner></base-spinner>
			</base-popup>

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
		</main>
	</div>
</template>

<script>
import errors from "@/messages/errors";
import BasePopup from "@/components/UI/BasePopup.vue";
import Canvas from "@/components/UI/Canvas";
export default {
	components: { BasePopup, Canvas },
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
				return "Есть аккаунт?";
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
					await this.$store.dispatch("saveAuthData", authData);

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
#app {
	height: 100vh;
	display: flex;
	flex-direction: column;
}

body {
	background-color: #171e26;
}

.container {
	position: relative;
	display: flex;
	flex-direction: column;
	@media (max-width: $tablet) {
		padding-top: 60px;
	}
}

.wrapper {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	max-width: 600px;
	width: 100%;
}
.popup {
	padding: 20px;
	background-color: #f0caca;
}

form {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	backdrop-filter: blur(5px);
	border: 1px solid rgba(255, 255, 255, 0.5);
	background-color: rgba(255, 255, 255, 0.2);
	border-right: 1px solid rgba(255, 255, 255, 0.2);
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	padding: 20px 50px;
	border-radius: 6px;
}

h1 {
	color: $white;
}

input {
	padding: 5px 10px;
}

p {
	font-size: 16px;
	line-height: 21px;

	& button {
		color: $white;
		border: none;
		background-color: transparent;
		font-size: 16px;
		line-height: 21px;
		text-decoration: underline;
	}
}
</style>
