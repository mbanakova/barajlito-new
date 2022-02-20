<template>
	<header class="header">
		<router-link to="/">Главная</router-link>
		<TheNav />
	</header>
</template>

<script>
import TheNav from "@/components/TheNav";
export default {
	components: { TheNav },
};
</script>
<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: space-between;
	padding: 10px 20px;
	background-color: #222222;
	color: white;
}

a {
	text-decoration: none;
	color: #94ddff;
	background-color: transparent;
	padding: 10px;
	border: 1px solid transparent;
	display: block;
	font-size: 16px;
	line-height: 20px;
	font-family: inherit;
	cursor: pointer;
	transition: all 0.3s ease-in-out;

	&:hover,
	&:active,
	&.router-link-active {
		border: 1px solid #94ddff;
	}
}
</style>
