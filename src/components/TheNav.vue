<template>
	<nav class="nav">
		<router-link to="/offers"
			><font-awesome icon="list" />Все объявления</router-link
		>
		<router-link to="/my-offers"
			><font-awesome icon="dolly" />Мои объявления</router-link
		>
		<router-link to="/new-offer"
			><font-awesome icon="edit" />Создать</router-link
		>
		<router-link to="/requests"
			><font-awesome icon="comments" />Входящие</router-link
		>
		<router-link to="/profile"><font-awesome icon="user" />Аккаунт</router-link>
		<button class="icon-button" @click="logout" v-if="isLoggedIn">
			<font-awesome icon="door-open" />Выход
		</button>
	</nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters({
			isLoggedIn: ["isLoggedIn"],
		}),
	},
	methods: {
		async logout() {
			await this.$store.dispatch("logout");
			this.$router.push("/auth");
		},
	},
};
</script>

<style lang="scss" scoped>
.nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;

	@media (max-width: $tablet) {
		display: none;
	}
}

a,
button {
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
	transition: $tr;

	&:hover,
	&:active,
	&.router-link-active {
		border: 1px solid $light;
	}

	& svg {
		margin-right: 5px;
	}
}

.icon-button {
	margin-left: 40px;
}
</style>
