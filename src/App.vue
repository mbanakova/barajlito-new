<template>
	<TheHeader />
	<router-view v-slot="slotProps"
		><transition name="route" mode="out-in">
			<component :is="slotProps.Component"></component> </transition
	></router-view>
	<TheFooter />
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";

export default {
	components: { TheHeader, TheFooter },
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
	padding: 20px;
	margin: 0 auto;
}

.base-button {
	text-decoration: none;
	font: inherit;
	background-image: repeating-linear-gradient(
		-60deg,
		#1d6d92,
		#1d6d92 10px,
		#275a81 10px,
		#275a81 20px
	);
	border: 2px solid #1d6d92;
	color: white;
	cursor: pointer;
	border-radius: 10px;
	font-weight: 500;
	padding: 10px 40px;
	margin-right: 0.5rem;
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
	right: 1.2em;
}

.base-button:hover,
.base-button:active {
	padding: 10px 50px 10px 30px;
}

.base-button--bright {
	background-image: repeating-linear-gradient(
		-60deg,
		#f74d4d,
		#f74d4d 10px,
		#c00808 10px,
		#c00808 20px
	);
	border: 2px solid #c00808;
}
input,
textarea {
	display: block;
	width: 100%;
	border: 1px solid #ccc;
	font: inherit;
	resize: vertical;
	padding: 5px 10px;
	transition: 0.3s all ease-in-out;
}

input:focus,
textarea:focus {
	background-color: #ebf6ff;
	outline: none;
	border-color: #275a81;
}

input[type="checkbox"] {
	display: inline;
	width: auto;
	border: none;
}

input[type="checkbox"]:focus {
	outline: #275a81 solid 1px;
}

h3 {
	margin: 0.5rem 0;
	font-size: 1rem;
}

.invalid label {
	color: #f74d4d;
}

.invalid input,
.invalid textarea {
	border: 1px solid #f74d4d;
}
</style>
