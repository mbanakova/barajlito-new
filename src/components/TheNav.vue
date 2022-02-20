<template>
	<nav class="nav">
		<router-link to="/my-offers">Мои объявления</router-link>
		<router-link to="/new-offer">Создать</router-link>
		<router-link to="/requests">Входящие</router-link>
		<router-link to="/profile">Аккаунт</router-link>
		<button @click="logout">Выход</button>
	</nav>
</template>

<script>
export default {
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

	&:last-child {
		margin-left: 60px;
	}

	&:hover,
	&:active {
		border: 1px solid #94ddff;
	}
}
</style>
