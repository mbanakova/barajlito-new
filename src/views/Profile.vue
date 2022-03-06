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

		<base-card>
			<h2>Изменить данные:</h2>
			<form @submit.prevent="updateProfile" class="profile__form">
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
	grid-template-areas: "current form";
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 40px;
}

.profile__current {
	grid-area: current;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
}

.profile__auth-data {
	grid-column: span 2;
	text-align: center;
}

.profile__form {
	grid-area: form;
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
	align-items: center;
	gap: 20px;
}
input {
	padding: 5px 10px;
}
</style>
