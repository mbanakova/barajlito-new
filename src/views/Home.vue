<template>
	<main class="wrapper">
		<div class="home">
			<h2>UPD 07.03.2022: Подключена страница 404</h2>
			<h3>UPD 06.03.2022: Можно редактировать профайл</h3>
		</div>
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
