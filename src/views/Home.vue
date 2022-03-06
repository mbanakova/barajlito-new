<template>
	<main class="wrapper">
		<div class="home">
			<h2>UPD 06.03.2022: Можно редактировать профайл</h2>
			<h3>
				UPD 04.03.2022: Можно редактировать свои карточки и писать сообщения
				продавцам
			</h3>
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
