<template>
	<TheHeader @burgerToggle="displaySideNav = !displaySideNav" />
	<TheSideNav :show="displaySideNav" @close="displaySideNav = false" />
	<router-view v-slot="slotProps">
		<transition name="route" mode="out-in">
			<component :is="slotProps.Component"> /></component>
		</transition></router-view
	>
	<TheFooter />
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheSideNav from "@/components/TheSideNav";
import TheFooter from "@/components/TheFooter";

export default {
	components: { TheHeader, TheSideNav, TheFooter },
	data() {
		return {
			displaySideNav: false,
		};
	},
	computed: {
		didAutoLogout() {
			return this.$store.getters.didAutoLogout;
		},
	},
	created() {
		this.$store.dispatch("tryLogin");
	},
	watch: {
		didAutoLogout(curValue, oldValue) {
			if (curValue && curValue !== oldValue) {
				this.$router.replace("/auth");
			}
		},
	},
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
// $dark: #030105;

*,
*::before,
*::after {
	box-sizing: border-box;
}

html {
	font-family: "Roboto", sans-serif;
}

body {
	margin: 0;
	overflow-x: hidden;
	font-size: 16px;
	line-height: 20px;
}
.route-enter-from {
	opacity: 0;
	transform: translateY(30px);
}

.route-leave-to {
	opacity: 0;
	transform: translateY(-30px);
}

.route-enter-active {
	transition: all 0.3s ease-out;
}

.route-leave-active {
	transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
	opacity: 1;
	transform: translateY(0);
}

#app {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.wrapper {
	max-width: 1440px;
	width: 100%;
	padding: 30px 20px 50px;
	margin: 0 auto;

	@media (max-width: $tablet) {
		padding-top: 90px;
	}
}

h1 {
	margin: 0 auto 30px;
	font-size: 32px;
	line-height: 110%;
	word-break: break-word;

	@media (max-width: $tablet) {
		font-size: 28px;
	}

	@media (max-width: $mobile) {
		font-size: 26px;
	}
}

h2 {
	margin: 0 auto 20px;
	font-size: 26px;
	line-height: 110%;

	@media (max-width: $tablet) {
		font-size: 24px;
	}

	@media (max-width: $mobile) {
		font-size: 22px;
	}
}

h3 {
	margin: 0 auto 15px;
	font-size: 22px;
	line-height: 110%;
	@media (max-width: $tablet) {
		font-size: 20px;
	}

	@media (max-width: $mobile) {
		font-size: 18px;
	}
}

ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

.base-button {
	text-decoration: none;
	font: inherit;
	background-image: repeating-linear-gradient(
		-60deg,
		$blue,
		$blue 10px,
		$navy 10px,
		$navy 20px
	);

	border: 2px solid $navy;
	color: $white;
	cursor: pointer;
	border-radius: 10px;
	font-weight: 500;
	padding: 10px 20px;
	display: inline-block;
	transition: all 0.3s ease-in-out;
	position: relative;
	text-align: center;
}

.base-button::after {
	position: absolute;
	content: "»";
	top: 9px;
	right: 1em;
	width: 10px;
	height: 10px;
	transition: all 0.3s ease-in-out;
	opacity: 0;
}

.base-button:hover::after,
.base-button:active::after {
	opacity: 1;
	right: 10px;
}

.base-button:hover,
.base-button:active {
	padding: 10px 30px 10px 10px;
}

.base-button--bright {
	background-image: repeating-linear-gradient(
		-60deg,
		$med-accent,
		$med-accent 10px,
		$dark-accent 10px,
		$dark-accent 20px
	);
	border: 2px solid $dark-accent;
}
input,
textarea {
	display: block;
	width: 100%;
	border: 1px solid #ccc;
	font-family: "Roboto", sans-serif;
	padding: 10px;
	transition: 0.3s all ease-in-out;
}

textarea {
	resize: vertical;
}

button {
	font-family: "Roboto", sans-serif;
	cursor: pointer;
}

input:focus,
textarea:focus {
	background-color: $light;
	outline: none;
	border-color: $bright;
}

input[type="checkbox"] {
	display: inline;
	width: auto;
	border: none;
}

input[type="checkbox"]:focus {
	outline: $bright solid 1px;
}

.invalid label {
	color: $med-accent;
}

.invalid input,
.invalid textarea {
	border: 1px solid $med-accent;
}
</style>
