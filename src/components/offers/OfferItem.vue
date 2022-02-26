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
	props: ["id", "uid", "owner", "date", "title", "rate", "description"],
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
		"links links";
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
	color: $bright;
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

.links {
	grid-area: links;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.edit {
	// background-image: repeating-linear-gradient(
	// 	-60deg,
	// 	#216274,
	// 	#216274 10px,
	// 	#094555 10px,
	// 	#094555 20px
	// );
	// border: 2px solid #094555;
	background-image: repeating-linear-gradient(
		-60deg,
		#995905,
		#995905 10px,
		#633a05 10px,
		#633a05 20px
	);
	border: 2px solid #633a05;
	color: white;
	cursor: pointer;
	border-radius: 10px;
	font-weight: 500;
	padding: 10px 20px;
	display: inline-block;
	transition: all 0.3s ease-in-out;
	position: relative;
	text-align: center;

	& svg {
		fill: white;
	}
}
</style>
