<template>
	<main class="profile wrapper">
		<base-popup :show="!!error" @close="gotIt">
			<p>{{ serverMessage }}</p>
		</base-popup>
		<base-card class="h1"><h1>Profile</h1></base-card>
		<base-card class="profile__current">
			<div class="profile__img">
				<font-awesome icon="user" />
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
import errors from "@/messages/errors";
import BasePopup from "../components/UI/BasePopup.vue";
import { mapGetters } from "vuex";

export default {
	components: { BasePopup },
	data() {
		return {
			image: null,
			imageUrl: "",
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
		}),
	},
	methods: {
		gotIt() {
			this.error = null;
		},

		async updateProfile() {
			const newData = {
				firstName: this.firstName,
				lastName: this.lastName,
				userName: this.userName,
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
				this.error = true;
				this.serverMessage = errors[error.code];
				throw error;
			}
		},
	},
};
</script>

<style scoped lang="scss">
.profile {
	display: grid;
	grid-template-areas:
		"h1 h1"
		"current form";
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 40px;
}

.h1 {
	grid-area: h1;
}

.profile__current {
	grid-area: current;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
}

// .profile__changable {
// }
.profile__auth-data {
	grid-column: span 2;
	text-align: center;
}

.profile__form {
	grid-area: form;
}

.profile__img {
	width: 80px;
	height: 80px;
	background-color: #213d52;
	border-radius: 6px;
	border: 3px solid white;
	outline: 2px solid #213d52;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;

	& svg {
		width: 25px;
		height: 25px;
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
