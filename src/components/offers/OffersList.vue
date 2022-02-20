<template>
	<div>
		<base-dialog
			:show="!!error"
			title="Данные не подгрузились"
			@close="handleError"
		>
			<p>{{ error }}</p>
		</base-dialog>
		<div class="list-page">
			<div v-if="isLoading">
				<base-spinner></base-spinner>
			</div>
			<ul v-else-if="hasOffers" class="post-list">
				<OfferItem
					v-for="offer in filteredOffers"
					:key="offer.id"
					:id="offer.id"
					:uid="offer.uid"
					:rate="offer.price"
					:date="offer.date"
					:title="offer.title"
					:description="offer.description"
				/>
			</ul>
			<h3 v-else>
				Никто пока не добавил объявлений. Станьте первым, добавив своё!
			</h3>

			<section class="side-filter">
				<base-card>
					<div class="controls">
						<button
							class="base-button base-button--bright"
							@click="loadOffers(true)"
						>
							Refresh
						</button>
						<base-button
							mode="standard"
							v-if="isLoggedIn && !isLoading"
							link
							to="/register"
							>Add new offer</base-button
						>
					</div>
				</base-card>
				<offer-filter @change-filter="setFilters"></offer-filter>
			</section>
		</div>
	</div>
</template>

<script>
import OfferItem from "@/components/offers/OfferItem";
import OfferFilter from "@/components/offers/OfferFilter.vue";
import { mapGetters } from "vuex";

export default {
	components: {
		OfferItem,
		OfferFilter,
	},
	data() {
		return {
			isLoading: false,
		};
	},

	// created() {
	// 	this.loadOffers();
	// },

	computed: {
		...mapGetters({
			filteredOffers: ["offers"],
			hasOffers: ["hasOffers"],
		}),
	},
	methods: {
		// async loadOffers(refresh = false) {
		// 	this.isLoading = true;
		// 	try {
		// 		await this.$store.dispatch("loadOffers", {
		// 			forceRefresh: refresh,
		// 		});
		// 	} catch (error) {
		// 		this.error = error.message || "Something went wrong!";
		// 	}
		// 	this.isLoading = false;
		// },
	},
};
</script>

<style scoped lang="scss">
.list-page {
	display: grid;
	grid-template-columns: 3fr 1fr;
	grid-column-gap: 50px;
	max-width: 1440px;
	margin: 0 auto;
	padding: 30px 20px;
}
.post-list {
	margin: 0 auto;
	display: grid;
	box-sizing: border-box;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 30px;
	padding: 0;

	@media (max-width: 1023px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 767px) {
		grid-template-columns: 1fr;
		grid-gap: 20px;
	}
}
</style>
