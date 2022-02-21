<template>
	<main class="profile wrapper">
		<base-popup :show="!!error" @close="gotIt">
			<p>{{ serverMessage }}</p>
		</base-popup>
		<h1>Profile</h1>
		<div class="profile__top">
			<div class="profile__img">
				<img :src="currentData.imageUrl" alt="" width="150" />
			</div>
			<div class="profile__info">
				<p>{{ currentData.firstName }}</p>
				<p>{{ currentData.lastName }}</p>
				<p>{{ currentData.userName }}</p>
				<p>{{ currentData.email }}</p>
				<p>{{ currentData.password }}</p>
			</div>
		</div>
		<form @submit.prevent="updateProfile">
			<img :src="imageUrl" alt="Avatar" width="100" />
			<!-- <button type="button" @click="onPickFile">Avatar</button> -->
			<input type="file" accept="image/*" @change="onFilePicked" />

			<input type="text" placeholder="First name" v-model.trim="firstName" />
			<input type="text" placeholder="Last Name" v-model.trim="lastName" />
			<input
				type="text"
				placeholder="Pick up username"
				v-model.trim="userName"
			/>
			<button type="submit">Сохранить</button>
		</form>
	</main>
</template>

<script>
import firebase from "firebase";
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
		}),
		// uid() {
		// 	return localStorage.getItem("uid");
		// },
	},
	methods: {
		gotIt() {
			this.error = null;
		},
		onFilePicked(event) {
			let avatar = event.target.files[0];

			let filename = avatar.name;

			const uid = firebase.auth().currentUser.uid;

			const ext = filename.slice(filename.lastIndexOf("."));
			let storageRef = firebase.storage().ref(`/users/${uid}/avatar${ext}`);
			const uploadTask = storageRef.put(avatar);

			uploadTask.on(
				"state_changed",
				snapshot => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress + "% done");
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused");
							break;
						case "running":
							console.log("Upload is running");
							break;
					}
				},
				error => {
					switch (error.code) {
						case "storage/unauthorized":
							break;
						case "storage/canceled":
							break;
						case "storage/unknown":
							break;
					}
				},
				() => {
					storageRef
						.getDownloadURL(uploadTask.snapshot.ref)
						.then(downloadURL => {
							this.imageUrl = downloadURL;
						});
				},
			);
		},
		async updateProfile() {
			const newData = {
				imageUrl: this.imageUrl,
				firstName: this.firstName,
				lastName: this.lastName,
				userName: this.userName,
			};
			try {
				await this.$store.dispatch("updateProfile", newData);
			} catch (error) {
				this.error = true;
				this.serverMessage = error.code;
				// this.serverMessage = errors[error.code];
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
