<template>
	<base-card>
		<form @submit.prevent="submitForm">
			<div class="form-control" :class="{ invalid: !title.isValid }">
				<input
					type="text"
					placeholder="Заголовок"
					id="title"
					v-model.trim="title.val"
					@blur="clearValidity('title')"
				/>
			</div>
			<div class="form-control" :class="{ invalid: !description.isValid }">
				<textarea
					id="description"
					placeholder="Описание"
					rows="5"
					v-model.trim="description.val"
					@blur="clearValidity('description')"
				/>
			</div>
			<div class="form-control" :class="{ invalid: !price.isValid }">
				<input
					type="number"
					placeholder="Стоимость в ₽"
					id="price"
					v-model.number="price.val"
					@blur="clearValidity('price')"
				/>
			</div>
			<p v-if="!formIsValid">Заполните обязательные поля перед отправкой.</p>
			<base-button mode="standard">Опубликовать</base-button>
		</form>
	</base-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	emits: ["save-data"],
	data() {
		return {
			date: "",
			title: {
				val: "",
				isValid: true,
			},
			description: {
				val: "",
				isValid: true,
			},
			price: {
				val: null,
				isValid: true,
			},
			formIsValid: true,
		};
	},
	computed: {
		...mapGetters({
			uid: ["userId"],
		}),
	},
	methods: {
		clearValidity(input) {
			this[input].isValid = true;
		},
		validateForm() {
			this.formIsValid = true;
			if (this.title.val === "") {
				this.title.isValid = false;
				this.formIsValid = false;
			}
			if (this.description.val === "") {
				this.description.isValid = false;
				this.formIsValid = false;
			}
			if (!this.price.val || this.price.val < 0) {
				this.price.isValid = false;
				this.formIsValid = false;
			}
		},
		async submitForm() {
			this.validateForm();

			if (!this.formIsValid) {
				return;
			}

			const formData = {
				// when Profile is ready add authorName
				uid: this.uid,
				date: new Date().toLocaleDateString(),
				title: this.title.val,
				description: this.description.val,
				price: this.price.val,
			};
			console.log("OfferForm data: ", formData);
			this.$emit("save-data", formData);
			await this.$store.commit("registerOffer", formData);
		},
	},
};
</script>

<style scoped>
.form-control {
	margin: 0.5rem 0;
}

label {
	font-weight: bold;
	display: block;
	margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
	font-weight: normal;
	display: inline;
	margin: 0 0 0 0.5rem;
}

input,
textarea {
	display: block;
	width: 100%;
	border: 1px solid #ccc;
	font: inherit;
	resize: vertical;
	padding: 5px 10px;
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
