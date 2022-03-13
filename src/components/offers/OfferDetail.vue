<template>
	<div class="offer__page">
		<base-card class="offer__img">
			<div class="offer__thumbnail">
				<img :src="thumbnail" :alt="title" />
			</div>
		</base-card>

		<base-card class="offer__info">
			<div class="offer__top">
				<h2>{{ title }}</h2>
				<h3 class="offer__date">{{ date }}</h3>
			</div>
			<h3>{{ price }} ₽</h3>
			<p class="offer__description">{{ description }}</p>

			<div class="badges__list">
				<base-badge
					v-for="area in areas"
					:key="area"
					:type="area"
					:badgeTitle="area"
				></base-badge>
			</div>
			<h3 class="offer__owner">Продаёт: {{ owner ? owner : ownerId }}</h3>

			<div v-if="isLoading">
				<base-spinner></base-spinner>
			</div>
			<ul class="contacts" v-else-if="contacts">
				<li v-if="contacts.telegram">
					<a
						:href="contacts.telegram"
						target="_blank"
						:title="contacts.telegram"
					>
						<font-awesome icon="paper-plane"
					/></a>
				</li>
				<li v-if="contacts.whatsapp">
					<a
						:href="contacts.whatsapp"
						target="_blank"
						:title="contacts.whatsapp"
					>
						<font-awesome icon="comment"
					/></a>
				</li>
				<li v-if="contacts.phone">
					<a :href="call" target="_blank" :title="contacts.call"
						><font-awesome icon="phone"
					/></a>
				</li>
				<li v-if="contacts.email">
					<a :href="mail" target="_blank" :title="contacts.mail"
						><font-awesome icon="envelope"
					/></a>
				</li>
			</ul>
		</base-card>

		<base-card v-if="isMyOffer" class="offer__chat">
			<router-link :to="editOffer" class="edit"
				>Редактировать <font-awesome icon="edit"
			/></router-link>
		</base-card>
		<base-card v-else>
			<h2>Связаться с {{ owner ? owner : "владельцем" }}:</h2>
			<form @submit.prevent="submitForm">
				<input
					type="text"
					id="userName"
					placeholder="Укажите своё имя"
					v-model="userName.val"
					:class="{ error: !formIsValid }"
					@blur="clearValidity('userName')"
				/>
				<textarea
					name="message"
					id="message"
					rows="5"
					v-model="message.val"
					:class="{ error: !formIsValid }"
					@blur="clearValidity('message')"
				></textarea>
				<p v-if="!formIsValid">Заполните форму перед отправкой</p>
				<base-button mode="bright" class="submit">Отправить</base-button>
			</form>
		</base-card>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	// components: { ContactOffer },
	props: ["id"],
	data() {
		return {
			selectedOffer: null,
			userName: {
				val: "",
				isValid: true,
			},
			message: {
				val: "",
				isValid: true,
			},
			formIsValid: true,
			isLoading: false,
		};
	},
	created() {
		this.selectedOffer = this.$store.getters["offers"].find(
			offer => offer.id === this.$route.params.id,
		);

		this.ownerId = this.selectedOffer.uid;
		this.loadContacts();
	},
	computed: {
		...mapGetters({
			uid: ["userId"],
			username: ["getUsername"],
			contacts: ["getContacts"],
		}),
		editOffer() {
			return "/edit/" + this.selectedOffer.id;
		},
		date() {
			return this.selectedOffer.date;
		},
		title() {
			return this.selectedOffer.title;
		},
		owner() {
			return this.selectedOffer.owner;
		},
		thumbnail() {
			return this.selectedOffer.thumbnail;
		},
		areas() {
			return this.selectedOffer.areas;
		},
		price() {
			return this.selectedOffer.price;
		},

		description() {
			return this.selectedOffer.description;
		},
		contactLink() {
			return this.$route.path + "/contact";
		},

		isMyOffer() {
			return this.selectedOffer.uid === this.uid;
		},
		call() {
			return `tel:${this.contacts.phone}`;
		},
		mail() {
			return `mailto:${this.contacts.email}`;
		},
	},
	methods: {
		async loadContacts() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("loadContacts", this.selectedOffer.uid);
			} catch (error) {
				this.error = error.message;
			}
			this.isLoading = false;
		},
		submitForm() {
			this.formIsValid = true;
			if (this.message.val === "" || this.userName.val === "") {
				this.formIsValid = false;
				return;
			}

			const messageData = {
				owner: this.ownerId,
				title: this.title,
				thumbnail: this.thumbnail,
				userName: this.userName.val,
				message: this.message.val,
			};
			this.$store.dispatch("contactOwner", { ...messageData });

			this.$router.replace("/");
		},

		clearValidity(input) {
			this[input].isValid = true;
		},
	},
};
</script>

<style lang="scss" scoped>
.offer__page {
	display: grid;
	grid-template-columns: 2fr 3fr;
	grid-template-areas: "img info" "img chat";
	grid-gap: 30px;

	@media (max-width: $mobile) {
		grid-template-columns: 1fr;
		grid-template-areas: "img" "info" "chat";
	}
}

.offer__img {
	grid-area: img;
}
.offer__info {
	grid-area: info;
}

.offer__top {
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
	align-items: center;
	gap: 30px;
	flex-wrap: wrap;
	& h2,
	& h3 {
		margin: 0;
	}
}
.offer__chat {
	grid-area: chat;
}

.offer__thumbnail {
	max-width: 100%;
}

.offer__thumbnail img {
	display: block;
	width: 100%;
	height: auto;
}

.offer__description {
	margin-bottom: 20px;
}

.offer__owner {
	word-break: break-word;
}
.offer__date {
	color: #c5c5c5;
	font-weight: 700;
	text-align: left;
	margin-bottom: 20px;
}

.badges__list {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	margin-bottom: 20px;
}

form {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

label {
	font-weight: bold;
	display: block;
	margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
	font-weight: normal;
	display: inline;
	margin: 0 0 0 0.5rem;
}

.invalid {
	border-color: $med-accent;
}

p {
	margin: 0;
}

.submit {
	align-self: flex-start;
}
.edit {
	background-image: repeating-linear-gradient(
		-60deg,
		$med-accent,
		$med-accent 10px,
		$dark-accent 10px,
		$dark-accent 20px
	);
	border: 2px solid $dark-accent;
	color: $white;
	cursor: pointer;
	border-radius: 10px;
	font-weight: 500;
	padding: 10px 20px;
	display: inline-block;
	transition: all 0.3s ease-in-out;
	position: relative;
	text-align: center;
	text-decoration: none;

	& svg {
		fill: $white;
	}
}

.error {
	border-color: $accent;
	background-color: lighten($accent, 45%);
}

.contacts {
	display: flex;
	gap: 20px;

	& a {
		color: $blue;
		transition: $tr;

		&:hover {
			color: $bright;
		}
	}

	& svg {
		fill: $blue;
	}
}
</style>
