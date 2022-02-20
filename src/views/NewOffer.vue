<template>
	<main class="wrapper">
		<h1>Новое объявление</h1>
		<OfferForm @save-data="saveData" />
	</main>
</template>

<script>
import OfferForm from "@/components/offers/OfferForm";
export default {
	components: { OfferForm },
	methods: {
		saveData(data) {
			this.$store.dispatch("registerOffer", data);
			this.$router.replace("/");
		},
	},
};
</script>
