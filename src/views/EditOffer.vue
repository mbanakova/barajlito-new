<template>
	<main class="wrapper">
		<h1>Редактировать объявление «{{ this.editedOffer.title }}»</h1>
		<base-card>
			<form @submit.prevent="submitEditedForm">
				<input
					:class="{ invalid: !title.isValid }"
					type="text"
					:placeholder="this.editedOffer.title"
					v-model.trim="title.val"
					id="title"
					@blur="clearValidity('title')"
				/>
				<textarea
					:class="{ invalid: !description.isValid }"
					id="description"
					:placeholder="this.editedOffer.description"
					v-model.trim="description.val"
					rows="5"
					@blur="clearValidity('description')"
				/>
				<input
					:class="{ invalid: !price.isValid }"
					type="number"
					:placeholder="this.editedOffer.price"
					id="price"
					v-model.number="price.val"
					@blur="clearValidity('price')"
				/>
				<p v-if="!formIsValid">Заполните обязательные поля перед отправкой.</p>
				<base-button mode="standard" class="submit">Сохранить</base-button>
			</form>
		</base-card>
	</main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	data() {
		return {
			editedOffer: null,
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

	created() {
		this.editedOffer = this.$store.getters["offers"].find(
			offer => offer.id === this.$route.params.id,
		);
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
		async submitEditedForm() {
			this.validateForm();

			if (!this.formIsValid) {
				return;
			}

			const editedOffer = {
				uid: this.uid,
				offerId: this.editedOffer.id,
				date: new Date().toLocaleDateString(),
				title: this.title.val,
				description: this.description.val,
				price: this.price.val,
			};
			await this.$store.dispatch("editOffer", editedOffer);
			this.$router.push("/");
		},
	},
};
</script>
<style scoped>
form {
	display: flex;
	flex-direction: column;

	gap: 20px;
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

.invalid {
	border-color: tomato;
}

p {
	margin: 0;
}

.submit {
	align-self: flex-start;
}
</style>
