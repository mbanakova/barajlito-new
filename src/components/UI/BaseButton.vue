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

<style scoped>
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
		#f74d4d,
		#f74d4d 10px,
		#c00808 10px,
		#c00808 20px
	);
	border-color: #c00808;
}

.bright:hover,
.bright:active {
	padding: 10px 50px 10px 30px;
}

.standard {
	background-image: repeating-linear-gradient(
		-60deg,
		#1d6d92,
		#1d6d92 10px,
		#275a81 10px,
		#275a81 20px
	);
	border-color: #1d6d92;
}

.standard:hover,
.standard:active {
	padding: 10px 50px 10px 30px;
}
</style>
