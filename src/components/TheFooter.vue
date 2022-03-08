<template>
	<footer>
		<div class="footer-wrapper">
			<div class="copyright">© mbanakova, {{ year }}</div>
			<div class="framework">
				build on<span class="framework__logo">Vue.js</span>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	data() {
		return {
			year: (this.year = new Date().getFullYear()),
		};
	},
	// computed: {
	// 	getYear() {
	// 		return (this.year = new Date().getFullYear());
	// 	},
	// },
};
</script>

<style lang="scss" scoped>
footer {
	margin-top: auto;
	padding: 40px;
	background-color: $dark;
	color: white;
	font-size: 14px;

	@media (max-width: $mobile) {
		padding: 25px 40px;
	}
}

.footer-wrapper {
	max-width: 1440px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;

	@media (max-width: $mobile) {
		flex-direction: column;
	}
}

.framework__logo {
	padding-left: 25px;
	position: relative;
}

.framework__logo::before {
	position: absolute;
	content: "";
	top: 0;
	left: 7px;
	width: 16px;
	height: 16px;
	background-image: url("~@/assets/vue.svg");
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
}
</style>
