<template>
	<main class="wrapper">
		<h1>ID объявления: {{ $route.params.id }}</h1>
		<OfferDetail />
	</main>
</template>
<script>
import OfferDetail from "@/components/offers/OfferDetail";
export default {
	components: { OfferDetail },
};
</script>
