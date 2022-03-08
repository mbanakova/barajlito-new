<template>
	<li class="card-ui">
		<div class="img">
			<img :src="thumbnail" alt="title" />
		</div>
		<h2>{{ title }}</h2>
		<h3>От: {{ from }}</h3>
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
	grid-template-columns: 200px 1fr 1fr;
	grid-column-gap: 30px;
	grid-template-areas:
		"img from when"
		"img message message"
		"title message message";

	@media (max-width: $tablet) {
		grid-template-columns: 200px 1fr;
		grid-template-areas:
			"img title"
			"img when"
			"img from"
			"message message";
	}

	@media (max-width: $mobile) {
		grid-template-columns: repeat(2, 1fr);
	}
}

.img {
	grid-area: img;

	& img {
		display: block;
		width: 100%;
		height: auto;
	}
}

h2 {
	grid-area: title;
	margin-left: 0;
	margin-bottom: 0;
}

h3 {
	grid-area: from;
	margin-left: 0;
	margin-bottom: 0;
}

p {
	grid-area: message;
}
</style>
