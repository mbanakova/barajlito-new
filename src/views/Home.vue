<template>
	<main class="wrapper">
		<div class="home">
			<h3>
				UPD 09.03.2022: Можно грузить картинки файлом, добавлен базовый адаптив
			</h3>
			<h3>UPD 07.03.2022: Подключена страница 404</h3>
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
