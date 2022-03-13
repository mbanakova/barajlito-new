<template>
	<main class="wrapper">
		<div class="home"></div>
		<OffersList />
	</main>
</template>

<script>
import OffersList from "@/components/offers/OffersList";
export default {
	name: "Home",
	components: { OffersList },
};
</script>
