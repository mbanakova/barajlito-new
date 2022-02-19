<template>
	<TheHeader />
	<router-view />
</template>

<script>
import TheHeader from "@/components/TheHeader";
export default {
	components: { TheHeader },
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

.main {
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
</style>
