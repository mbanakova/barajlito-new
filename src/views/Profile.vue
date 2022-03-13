<template>
	<main class="profile wrapper">
		<base-popup :show="!!error" @close="gotIt">
			<p>{{ serverMessage }}</p>
		</base-popup>

		<base-card class="profile__current">
			<h1>Profile</h1>
			<div class="profile__img">
				<img :src="avatar" />
			</div>
			<div class="profile__changable">
				<p>{{ currentData.firstName }}</p>
				<p>{{ currentData.lastName }}</p>
				<p>{{ currentData.userName }}</p>
			</div>
			<div class="profile__auth-data">
				<p>{{ currentData.email }}</p>
				<p>{{ currentData.password }}</p>
			</div>
		</base-card>

		<base-card class="profile__form">
			<h2>Изменить данные:</h2>
			<form @submit.prevent="updateProfile">
				<input
					type="file"
					ref="fileInput"
					accept="image/*"
					@change="onFileSelected"
				/>
				<input type="text" placeholder="Имя" v-model.trim="firstName" />
				<input type="text" placeholder="Фамилия" v-model.trim="lastName" />
				<input
					type="text"
					placeholder="Имя для отображения"
					v-model.trim="userName"
				/>
				<div class="profile__contacts">
					<h4>Контакты:</h4>
					<div class="input__wrap">
						<font-awesome icon="paper-plane" /><input
							type="text"
							placeholder="telegram"
							v-model.trim="telegram"
						/>
					</div>
					<div class="input__wrap">
						<font-awesome icon="comment" /><input
							type="text"
							placeholder="whatsapp"
							v-model.trim="whatsapp"
						/>
					</div>
					<div class="input__wrap">
						<font-awesome icon="phone" /><input
							type="tel"
							placeholder="телефон"
							v-model.trim="phone"
						/>
					</div>
					<div class="input__wrap">
						<font-awesome icon="envelope" /><input
							type="email"
							placeholder="почта"
							v-model.trim="eMail"
						/>
					</div>
				</div>
				<button type="submit" class="base-button">Сохранить</button>
			</form>
		</base-card>
	</main>
</template>

<script>
import BasePopup from "../components/UI/BasePopup.vue";
import { mapGetters } from "vuex";
// import firebase from "firebase/app";
// import "firebase/storage";

export default {
	components: { BasePopup },
	data() {
		return {
			image: null,
			firstName: "",
			lastName: "",
			userName: "",
			error: null,
		};
	},
	created() {
		this.getProfile();
	},
	computed: {
		...mapGetters({
			currentData: ["profileUserData"],
			uid: ["userId"],
			token: ["token"],
			avatar: ["getAvatar"],
		}),
	},
	methods: {
		async onFileSelected(event) {
			let avatar = event.target.files[0];

			try {
				await this.$store.dispatch("loadAvatar", avatar);
			} catch (error) {
				this.error = error.message;
			}
		},

		gotIt() {
			this.error = null;
		},

		async updateProfile() {
			const newData = {
				firstName: this.firstName,
				lastName: this.lastName,
				userName: this.userName,
				avatar: this.avatar,
			};
			try {
				await this.$store.dispatch("updateProfile", newData);
			} catch (error) {
				this.error = true;
				this.serverMessage = error.code;
				throw error;
			}
		},

		async getProfile() {
			try {
				await this.$store.dispatch("fetchProfile");
			} catch (error) {
				throw new Error(error);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.profile {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 40px;

	@media (max-width: $mobile) {
		grid-template-columns: 1fr;
	}
}

.profile__current {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
}

.profile__auth-data {
	grid-column: span 2;
	text-align: center;
}

.profile__img {
	width: 100px;
	border-radius: 6px;
	border: 3px solid $grey;
	padding: 10px;

	& img {
		width: 100%;
		height: auto;
		display: block;
	}
}

form {
	display: flex;
	flex-direction: column;

	gap: 20px;
}

.profile__contacts {
	display: flex;
	flex-direction: column;
	gap: 20px;
}
h4 {
	align-self: flex-start;
	margin: 0;
}

.input__wrap {
	display: flex;
	align-items: center;
	gap: 10px;
}
input {
	padding: 5px 10px;
}
</style>
