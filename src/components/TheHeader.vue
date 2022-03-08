<template>
	<header class="header">
		<div class="header__wrapper">
			<router-link to="/"><font-awesome icon="home" />Главная</router-link>
			<TheNav />
			<TheBurger @toggle="$emit('burgerToggle')" />
		</div>
	</header>
</template>

<script>
import TheNav from "@/components/TheNav";
import TheBurger from "@/components/TheBurger";

export default {
	components: { TheNav, TheBurger },
};
</script>
<style lang="scss" scoped>
.header {
	background-color: #222222;
	color: white;

	@media (max-width: $tablet) {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 10;
	}
}

.header__wrapper {
	max-width: 1440px;
	width: 100%;
	margin: 0 auto;
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
}

a {
	text-decoration: none;
	color: $light;
	background-color: transparent;
	padding: 10px;
	border: 1px solid transparent;
	display: block;
	font-size: 14px;
	line-height: 18px;
	font-family: inherit;
	cursor: pointer;
	transition: all 0.3s ease-in-out;

	&:hover,
	&:active,
	&.router-link-active {
		border: 1px solid $light;
	}
	& svg {
		margin-right: 5px;
	}
}
</style>
