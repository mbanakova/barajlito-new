<template>
	<div>
		<base-popup :show="!!error" title="Данные не подгрузились" @close="gotIt">
			<p>{{ error }}</p>
		</base-popup>
		<div class="list-page">
			<div v-if="isLoading">
				<base-spinner></base-spinner>
			</div>
			<transition-group
				tag="ul"
				name="offers-list"
				v-else-if="hasOffers && !isLoading"
				class="post-list"
			>
				<OfferItem
					v-for="offer in filteredOffers"
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
			</transition-group>
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
							<font-awesome icon="sync-alt" />
						</button>
						<base-button
							mode="standard"
							v-if="isLoggedIn && !isLoading"
							link
							to="/new-offer"
							>Создать</base-button
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
			offers: ["offers"],
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
		setFilters(updatedFilters) {
			this.activeFilters = updatedFilters;
		},
		async loadOffers(refresh = false) {
			this.isLoading = true;
			try {
				await this.$store.dispatch("fetchOffers", { forceRefresh: refresh });
			} catch (error) {
				this.error = error.message;
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

	@media (max-width: 1200px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 767px) {
		grid-template-columns: 1fr;
		grid-gap: 20px;
	}
}
.offers-list-enter-from {
	opacity: 0;
	transform: translateY(-30px);
}

.offers-list-enter-active {
	transition: all 1s ease-out;
}

.offers-list-leave-active {
	transition: all 1s ease-in;
	position: absolute;
}

.offers-list-enter-to,
.offers-list-leave-from {
	opacity: 1;
	transform: translateY(0);
}

.offers-list-leave-to {
	opacity: 0;
	transform: translateY(30px);
}

.offers-list-move {
	transition: transform 0.8s ease;
}
.controls {
	display: flex;
	justify-content: space-between;
	gap: 20px;
}
</style>
