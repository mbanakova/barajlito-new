<template>
	<div class="sidenav-container">
		<transition name="slide-side">
			<div v-if="show" class="sidenav">
				<ul class="nav-list" @click="$emit('close'), burgerToggle()">
					<li class="nav-item">
						<router-link to="/offers"
							><font-awesome icon="list" />Все объявления</router-link
						>
					</li>
					<li class="nav-item">
						<router-link to="/my-offers"
							><font-awesome icon="dolly" />Мои объявления</router-link
						>
					</li>
					<li class="nav-item">
						<router-link to="/new-offer"
							><font-awesome icon="edit" />Создать</router-link
						>
					</li>
					<li class="nav-item">
						<router-link to="/requests"
							><font-awesome icon="comments" />Входящие</router-link
						>
					</li>
					<li class="nav-item">
						<router-link to="/profile"
							><font-awesome icon="user" />Аккаунт</router-link
						>
					</li>
				</ul>
				<button
					class="icon-button"
					@click="$emit('close'), burgerToggle(), logout()"
					v-if="isLoggedIn"
				>
					<font-awesome icon="door-open" />Выход
				</button>
			</div>
		</transition>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "TheSidenav",
	props: {
		show: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		...mapGetters({
			isLoggedIn: ["isLoggedIn"],
			isOpen: ["burger"],
		}),
	},
	methods: {
		burgerToggle() {
			this.$store.commit("burgerToggle");
		},
		async logout() {
			await this.$store.dispatch("logout");
			this.$router.push("/auth");
		},
	},
};
</script>

<style lang="scss" scoped>
.sidenav-container {
	height: calc(100% - 60px);
	width: 100%;
}

.sidenav {
	height: calc(100% - 60px);
	width: 100%;
	background-color: $dark;
	color: $light;
	z-index: 10000;
	position: fixed;
	top: $header;
	bottom: $footer;
	left: 0;
	box-sizing: border-box;
	padding: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
}

.slide-side-enter-from {
	transform: translateX(-100%);
}
.slide-side-enter-to {
	transform: translateX(0);
}

.slide-side-enter-active {
	transition: all 0.5s ease-in;
}

.slide-side-leave-active {
	transition: all 0.5s ease-in;
}

.slide-side-leave-to {
	transform: translateX(-100%);
}

.nav-list {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
}

.nav-item a {
	text-decoration: none;
	color: $light;
	font-size: 16px;
}

.nav-item a:active {
	color: $bright;
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

	&:active {
		border: 1px solid $light;
	}

	& svg {
		margin-right: 10px;
	}
}
</style>
