<template>
	<button v-if="!link" :class="mode">
		<slot />
	</button>
	<router-link v-else :to="to" :class="mode">
		<slot />
	</router-link>
</template>

<script>
export default {
	props: {
		mode: {
			type: String,
			required: false,
			default: null,
		},
		link: {
			type: Boolean,
			required: false,
			default: false,
		},
		to: {
			type: String,
			required: false,
			default: "/",
		},
	},
};
</script>

<style lang="scss" scoped>
button,
a {
	text-decoration: none;
	font: inherit;
	background-color: #1d6d92;
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

button::after,
a::after {
	position: absolute;
	content: "»";
	top: 9px;
	right: 1em;
	width: 10px;
	height: 10px;
	transition: all 0.3s ease-in-out;
	opacity: 0;
}

a:hover::after,
a:active::after,
button:hover::after,
button:active::after {
	opacity: 1;
	right: 1.2em;
}

.bright {
	background-image: repeating-linear-gradient(
		-60deg,
		$med-accent,
		$med-accent 10px,
		$dark-accent 10px,
		$dark-accent 20px
	);
	border-color: $dark-accent;
}

.bright:hover,
.bright:active {
	padding: 10px 50px 10px 30px;
}

.standard {
	background-image: repeating-linear-gradient(
		-60deg,
		$blue,
		$blue 10px,
		$navy 10px,
		$navy 20px
	);

	border-color: $navy;
}

.standard:hover,
.standard:active {
	padding: 10px 50px 10px 30px;
}
</style>
