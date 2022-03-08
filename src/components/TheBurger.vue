<template>
	<div
		class="burger"
		role="button"
		@click="$emit('toggle'), burgerToggle()"
		:class="{ open: isOpen }"
	>
		<div class="bar"></div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters({
			isOpen: ["burger"],
		}),
	},
	methods: {
		burgerToggle() {
			this.$store.commit("burgerToggle");
		},
	},
};
</script>

<style lang="scss" scoped>
.burger {
	position: relative;
	align-self: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 28px;
	width: 28px;
	cursor: pointer;
	appearance: none;
	background: none;
	outline: none;
	border: none;

	&::before,
	&::after {
		position: absolute;
		content: "";
		width: 100%;
		top: 2px;
		left: 0;
		height: 2px;
		background-color: $light;
		transition: 0.4s;
	}

	&::after {
		top: unset;
		bottom: 2px;
	}

	@media (min-width: $tablet + 1px) {
		display: none;
	}
}

.burger .bar {
	position: absolute;
	content: "";
	display: block;
	width: 100%;
	height: 2px;
	background-color: $light;

	transition: 0.4s;
}

.burger.open::before {
	transform: rotate(315deg) translate(-8px, 8px);
}

.burger.open::after {
	transform: rotate(225deg) translate(7px, 7px);
}

.burger.open .bar {
	opacity: 0;
}
</style>
