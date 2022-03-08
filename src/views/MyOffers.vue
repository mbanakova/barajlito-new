<template>
	<main class="wrapper">
		<h1>My offers</h1>

		<base-popup :show="!!error" title="Данные не подгрузились" @close="gotIt">
			<p>{{ error }}</p>
		</base-popup>

		<div v-if="isLoading">
			<base-spinner></base-spinner>
		</div>
		<ul v-else-if="hasOffers" class="post-list">
			<OfferItem
				v-for="offer in myOffers"
				:key="offer.id"
				:id="offer.id"
				:uid="offer.uid"
				:thumbnail="offer.thumbnail"
				:rate="offer.price"
				:areas="offer.areas"
				:date="offer.date"
				:title="offer.title"
				:description="offer.description"
			/>
		</ul>
		<div v-else>
			<h3>У вас пока нет ни одного объявления!</h3>
			<router-link to="/new-offer" class="base-button base-button--bright"
				>Создать</router-link
			>
		</div>

		<!-- <section class="side-filter">
				<base-card>
					<div class="controls">
						<button
							class="base-button base-button--bright"
							@click="loadOffers(true)"
						>
							<font-awesome icon="sync-alt" />
						</button>
						<base-button
							mode="standard"
							v-if="isLoggedIn && !isLoading"
							link
							to="/new-offer"
							>Add new offer</base-button
						>
					</div>
				</base-card>
				<offer-filter @change-filter="setFilters"></offer-filter>
			</section> -->
	</main>
</template>

<script>
import OfferItem from "@/components/offers/OfferItem";
// import OfferFilter from "@/components/offers/OfferFilter.vue";
import { mapGetters } from "vuex";

export default {
	components: {
		OfferItem,
		// OfferFilter,
	},
	data() {
		return {
			isLoading: false,
			error: null,
			activeFilters: {
				apparel: true,
				home: true,
				toys: true,
				sport: true,
				books: true,
				kitchen: true,
				hobby: true,
				auto: true,
				ussr: true,
				plants: true,
				pets: true,
				leisure: true,
				others: true,
			},
		};
	},

	created() {
		this.loadOffers();
	},

	computed: {
		...mapGetters({
			myOffers: ["myOffers"],
			hasOffers: ["hasOffers"],
			isLoggedIn: ["isLoggedIn"],
		}),
		filteredOffers() {
			const offers = this.offers;
			return offers.filter(offer => {
				if (this.activeFilters.apparel && offer.areas.includes("apparel")) {
					return true;
				}
				if (this.activeFilters.home && offer.areas.includes("home")) {
					return true;
				}
				if (this.activeFilters.toys && offer.areas.includes("toys")) {
					return true;
				}
				if (this.activeFilters.sport && offer.areas.includes("sport")) {
					return true;
				}
				if (this.activeFilters.books && offer.areas.includes("books")) {
					return true;
				}
				if (this.activeFilters.kitchen && offer.areas.includes("kitchen")) {
					return true;
				}
				if (this.activeFilters.hobby && offer.areas.includes("hobby")) {
					return true;
				}
				if (this.activeFilters.auto && offer.areas.includes("auto")) {
					return true;
				}
				if (this.activeFilters.ussr && offer.areas.includes("ussr")) {
					return true;
				}
				if (this.activeFilters.plants && offer.areas.includes("plants")) {
					return true;
				}
				if (this.activeFilters.pets && offer.areas.includes("pets")) {
					return true;
				}
				if (this.activeFilters.leisure && offer.areas.includes("leisure")) {
					return true;
				}
				if (this.activeFilters.others && offer.areas.includes("others")) {
					return true;
				}
				return false;
			});
		},
	},
	methods: {
		// setFilter(event) {
		// 	const inputId = event.target.id;
		// 	const isActive = event.target.checked;
		// 	const updatedFilters = {
		// 		...this.filters,
		// 		[inputId]: isActive,
		// 	};
		// 	this.filters = updatedFilters;
		// 	this.$emit("change-filter", updatedFilters);
		// },
		setFilters(updatedFilters) {
			this.activeFilters = updatedFilters;
		},
		async loadOffers(refresh = false) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("fetchOffers", {
					forceRefresh: refresh,
				});
			} catch (error) {
				this.error = error.message || "Something went wrong!";
			}
			this.isLoading = false;
		},
		gotIt() {
			this.error = null;
		},
	},
};
</script>

<style lang="scss" scoped>
.side-filter {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.post-list {
	margin: 0 auto;
	display: grid;
	box-sizing: border-box;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 30px;
	padding: 0;

	@media (max-width: $tablet) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: $mobile) {
		grid-template-columns: 1fr;
		grid-gap: 20px;
	}
}

.controls {
	display: flex;
	justify-content: space-between;
	gap: 20px;
}
</style>
