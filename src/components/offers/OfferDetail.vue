<template>
	<div class="wrapper offer__page">
		<section class="offer__img">
			<base-card>
				<div class="offer__thumbnail">
					<img :src="thumbnail" :alt="title" />
				</div>
			</base-card>
		</section>
		<section class="offer__info">
			<base-card>
				<h2>{{ title }}</h2>
				<h3>{{ price }} ₽</h3>
				<p>{{ description }}</p>
				<h3 class="offer__owner">{{ owner }}</h3>
				<h3 class="offer__date">{{ date }}</h3>
			</base-card>
		</section>
		<section class="offer__chat">
			<base-card>
				<header>
					<h2>Intrested? Contact the owner!</h2>
					<base-button link :to="contactLink" mode="bright"
						>Contact</base-button
					>
				</header>
				<contact-offer></contact-offer>
			</base-card>
		</section>
	</div>
</template>

<script>
// import ContactOffer from "../Requests/ContactOffer.vue";

export default {
	// components: { ContactOffer },
	props: ["id"],
	data() {
		return {
			selectedOffer: null,
		};
	},
	computed: {
		date() {
			return this.selectedOffer.date;
		},
		title() {
			return this.selectedOffer.title;
		},
		owner() {
			return this.selectedOffer.owner;
		},
		// thumbnail() {
		// 	return this.selectedOffer.thumbnail;
		// },
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
	},
	created() {
		this.selectedOffer = this.$store.getters["offers"].find(
			offer => offer.id === this.$route.params.id,
		);
	},
};
</script>

<style scoped>
.offer__page {
	display: grid;
	grid-template-columns: 2fr 3fr;
	grid-template-areas: "img info" "img chat";
	grid-gap: 30px;
}

.offer__img {
	grid-area: img;
}
.offer__info {
	grid-area: info;
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
}
</style>
