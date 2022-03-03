<template>
	<li class="card-ui">
		<img :src="thumbnail" alt="title" />
		<h2>{{ title }}</h2>
		<h3>{{ from }}</h3>
		<span>{{ when }}</span>
		<p>{{ message }}</p>
	</li>
</template>

<script>
export default {
	props: ["from", "when", "message", "title", "thumbnail"],
};
</script>

<style lang="scss" scoped>
li {
	list-style: none;
	margin: 0 0 20px;
	padding: 20px;
	display: grid;
	grid-template-columns: 200px, 1fr, 1fr;
	grid-column-gap: 30px;
	grid-template-areas:
		"img from when"
		"img message message"
		"title message message";
}

img {
	display: block;
	width: 100px;
	height: auto;
	grid-area: img;
}

h2 {
	grid-area: title;
}

h3 {
	grid-area: from;
}

p {
	grid-area: message;
}
</style>
