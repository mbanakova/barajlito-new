<template>
	<base-card class="post-card">
		<!-- <router-link
			:to="offerDetailsLink"
			class="post-thumbnail"
			:style="{ backgroundImage: 'url(' + thumbnail + ')' }"
		></router-link> -->
		<div class="post-content">
			<div class="post-date">{{ date }}</div>
			<div class="item-price">{{ rate }} ₽</div>
			<h1 class="post-title">{{ title }}</h1>

			<p class="post-description">{{ description }}</p>
			<!-- <div class="post-tags">
				<base-badge
					v-for="area in areas"
					:key="area"
					:type="area"
					:badgeTitle="area"
				></base-badge>
			</div> -->
			<router-link :to="offerDetailsLink" class="post-cta"
				>Подробнее</router-link
			>
		</div>
	</base-card>
</template>

<script>
import BaseCard from "@/components/UI/BaseCard";
export default {
	components: { BaseCard },
	props: ["id", "uid", "owner", "date", "title", "rate", "description"],
	data() {},
	computed: {
		offerDetailsLink() {
			return "/offers/" + this.id; //offers/c1
		},
	},
};
</script>

<style scoped>
.post-card {
	overflow: hidden;
	height: 100%;
	display: flex;
	flex-direction: column;
}

a {
	text-decoration: none;
	color: black;
}

/* .post-thumbnail {
	width: 100%;
	height: 200px;
	display: block;
	text-decoration: none;
	background-position: center;
	background-size: cover;
	border-bottom-left-radius: 6px;
	border-bottom-right-radius: 6px;
} */

.post-content {
	text-align: center;
	flex-grow: 1;
	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-column-gap: 30px;
	grid-template-areas:
		"date price"
		"title title"
		"description description"
		"tags tags"
		"cta .";
}

.post-date {
	grid-area: date;
	color: #c5c5c5;
	font-weight: 700;
	text-align: left;
	margin-bottom: 20px;
}
.item-price {
	grid-area: price;
	text-align: right;
	color: #275a81;
	font-weight: 700;
}
.post-title {
	grid-area: title;
	margin: 0;
	text-align: left;
	font-size: 24px;
	margin-bottom: 10px;
}
.post-description {
	grid-area: description;
	margin: 0;
	text-align: left;
	margin-bottom: 15px;
}
.post-tags {
	grid-area: tags;
	margin: 0;
	padding: 0;
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	gap: 10px;
	margin-bottom: 30px;
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

.post-cta {
	margin-top: auto;
	grid-area: cta;
	display: block;
	background-image: repeating-linear-gradient(
		-60deg,
		#1d6d92,
		#1d6d92 10px,
		#275a81 10px,
		#275a81 20px
	);
	color: white;
	border-radius: 10px;
	padding: 10px 25px;
	font-weight: 500;
	text-align: center;
	position: relative;
	transition: all 0.3s ease-in-out;
}
.post-cta::after {
	position: absolute;
	content: "»";
	top: 9px;
	right: 1em;
	width: 10px;
	height: 10px;
	transition: all 0.3s ease-in-out;
	opacity: 0;
}

.post-cta:hover,
.post-cta:active {
	padding: 10px 35px 10px 15px;
}

.post-cta:hover::after,
.post-cta:active::after {
	opacity: 1;
	right: 1.4em;
}
</style>
