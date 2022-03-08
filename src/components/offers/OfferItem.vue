<template>
	<base-card class="post-card">
		<router-link
			:to="offerDetailsLink"
			class="post-thumbnail"
			:style="{ backgroundImage: 'url(' + thumbnail + ')' }"
		></router-link>
		<div class="post-content">
			<div class="date-price">
				<div class="post-date">{{ date }}</div>
				<div class="item-price">{{ rate }} ₽</div>
			</div>
			<h1 class="post-title">{{ title }}</h1>

			<p class="post-description">{{ description }}</p>
			<div class="post-tags">
				<base-badge
					v-for="area in areas"
					:key="area"
					:type="area"
					:badgeTitle="area"
				></base-badge>
			</div>
			<div class="links">
				<router-link :to="offerDetailsLink" class="base-button"
					>Подробнее</router-link
				>
				<router-link :to="editOffer" class="edit" v-if="isAuthor"
					><font-awesome icon="edit"
				/></router-link>
			</div>
		</div>
	</base-card>
</template>

<script>
export default {
	emits: ["my-offers"],
	props: [
		"id",
		"uid",
		"thumbnail",
		"owner",
		"date",
		"title",
		"rate",
		"description",
		"areas",
	],
	data() {
		return {
			editOffer: "/edit/" + this.id,
		};
	},
	computed: {
		offerDetailsLink() {
			return "/offers/" + this.id; //offers/c1
		},
		isAuthor() {
			return this.uid === this.$store.getters["userId"];
		},
	},
};
</script>

<style lang="scss" scoped>
.post-card {
	overflow: hidden;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 0;
}

.post-thumbnail {
	width: 100%;
	height: 200px;
	display: block;
	text-decoration: none;

	background-position: center;
	background-size: cover;
	border-bottom-left-radius: 6px;
	border-bottom-right-radius: 6px;
}

.post-content {
	text-align: center;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 20px;
	padding: 20px;
}

.date-price {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.post-date {
	color: #c5c5c5;
	font-weight: 700;
	text-align: left;
}
.item-price {
	text-align: right;
	color: $bright;
	font-weight: 700;
}

.post-title {
	margin: 0;
	text-align: left;
	font-size: 20px;
	line-height: 25px;
}

.post-description {
	margin: 0;
	text-align: left;
}
.post-tags {
	margin: 0;
	padding: 0;
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	gap: 10px;
}

.post-tag {
	list-style: none;
	color: #9da9af;
	padding: 2px 10px;
	border: 1px solid #9da9af;
	font-weight: 500;
	font-size: 12px;
	border-radius: 10px;
}

.links {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
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

	& svg {
		fill: $white;
	}
}
</style>
