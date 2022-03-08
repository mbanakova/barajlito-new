<template>
	<base-card class="filter">
		<h2>Выбрать категорию:</h2>
		<div class="filters__list">
			<label for="apparel">
				<input type="checkbox" id="apparel" checked @change="setFilter" />
				<span class="check"></span>
				одежда</label
			>

			<label for="toys">
				<input type="checkbox" id="toys" checked @change="setFilter" /><span
					class="check"
				></span>
				игрушки</label
			>
			<label for="sport">
				<input type="checkbox" id="sport" checked @change="setFilter" /><span
					class="check"
				></span>
				спорт</label
			>
			<label for="books">
				<input type="checkbox" id="books" checked @change="setFilter" /><span
					class="check"
				></span>
				книги</label
			>
			<label for="home">
				<input type="checkbox" id="home" checked @change="setFilter" /><span
					class="check"
				></span>
				дом</label
			>
			<label for="kitchen">
				<input type="checkbox" id="kitchen" checked @change="setFilter" /><span
					class="check"
				></span>
				кухня</label
			>
			<label for="hobby">
				<input type="checkbox" id="hobby" checked @change="setFilter" /><span
					class="check"
				></span>
				увлечения</label
			>
			<label for="auto">
				<input type="checkbox" id="auto" checked @change="setFilter" /><span
					class="check"
				></span>
				авто</label
			>
			<label for="ussr">
				<input type="checkbox" id="ussr" checked @change="setFilter" /><span
					class="check"
				></span>
				ссср</label
			>
			<label for="plants">
				<input type="checkbox" id="plants" checked @change="setFilter" /><span
					class="check"
				></span>
				растения</label
			>
			<label for="pets">
				<input type="checkbox" id="pets" checked @change="setFilter" /><span
					class="check"
				></span>
				животные</label
			>
			<label for="leisure">
				<input type="checkbox" id="leisure" checked @change="setFilter" /><span
					class="check"
				></span>
				отдых</label
			>
			<label for="others">
				<input type="checkbox" id="others" checked @change="setFilter" /><span
					class="check"
				></span>
				разное</label
			>
		</div>
	</base-card>
</template>

<script>
export default {
	emits: ["change-filter"],
	data() {
		return {
			filters: {
				apparel: true,
				home: true,
				toys: true,
				sport: true,
				books: true,
				kitchen: true,
				hobby: true,
				auto: true,
				ussr: true,
				plants: true,
				pets: true,
				leisure: true,
				others: true,
			},
		};
	},
	methods: {
		setFilter(event) {
			const inputId = event.target.id;
			const isActive = event.target.checked;
			const updatedFilters = {
				...this.filters,
				[inputId]: isActive,
			};
			this.filters = updatedFilters;
			this.$emit("change-filter", updatedFilters);
		},
	},
};
</script>

<style lang="scss" scoped>
h2 {
	margin: 0 0 25px;
}

.filter {
	flex-grow: 1;
}

.filters__list {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	gap: 10px;
}

input[type="checkbox"] {
	appearance: none;
	position: absolute;
	padding: 0;
	background-color: #e2e2e2;
	border: none;
	margin: 0;
	outline: none;
}

label {
	padding: 5px 10px 5px 33px;
	position: relative;
	display: block;
	background-color: #e2e2e2;
	cursor: pointer;
	border-radius: 15px;
	user-select: none;
}

.check {
	position: absolute;
	content: "";
	top: 50%;
	transform: translateY(-50%);
	left: 5px;
	width: 20px;
	height: 20px;
	background-color: white;
	border: 2px solid $med-accent;
	border-radius: 50%;
}

.check::before {
	position: absolute;
	content: "";
	display: none;
	top: 4px;
	left: 50%;
	width: 8px;
	height: 6px;
	border-bottom: 2px solid #222222;
	border-left: 2px solid #222222;
	transform: translateX(-50%) rotate(-45deg);
	transform-origin: center;
	transition: 0.3s ease-in-out all;
}

input[type="checkbox"]:checked ~ .check::before {
	display: block;
}
</style>
