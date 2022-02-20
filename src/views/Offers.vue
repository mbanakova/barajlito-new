<template>
	<main class="wrapper">
		<div v-if="isLoading">
			<base-spinner></base-spinner>
		</div>

		<OffersList />
	</main>
</template>

<script>
import OffersList from "@/components/offers/OffersList";
export default {
	components: {
		OffersList,
	},
	data() {
		return {
			isLoading: false,
		};
	},
};
</script>

<style scoped>
.post-list {
	margin: 0 auto;
	display: grid;
	box-sizing: border-box;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 30px;
	padding: 0;
}

@media (max-width: 1023px) {
	.post-list {
		grid-template-columns: repeat(3, 1fr);
	}
}
@media (max-width: 767px) {
	.post-list {
		grid-template-columns: 2fr;
		grid-gap: 20px;
	}
}
</style>
