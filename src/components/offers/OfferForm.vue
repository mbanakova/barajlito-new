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
			<div class="form-control" :class="{ invalid: !thumbnail.isValid }">
				<input
					type="text"
					name=""
					placeholder="Ссылка на фото (пока так)"
					id="thumbnail"
					v-model.trim="thumbnail.val"
					@blur="clearValidity('thumbnail')"
				/>
				<p v-if="!thumbnail.isValid">Добавьте фото</p>
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
			<div
				class="form-control checkboxes-grid"
				:class="{ invalid: !areas.isValid }"
			>
				<h3>Отметьте подходящие категории:</h3>
				<div>
					<input
						type="checkbox"
						id="apparel"
						value="apparel"
						v-model="areas.val"
					/>
					<label for="apparel">одежда</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="home"
						value="home"
						v-model="areas.val"
						@blur="clearValidity('areas')"
					/>
					<label for="home">дом</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="toys"
						value="toys"
						v-model="areas.val"
						@blur="clearValidity('areas')"
					/>
					<label for="toys">игрушки</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="sport"
						value="sport"
						v-model="areas.val"
						@blur="clearValidity('areas')"
					/>
					<label for="sport">спорт</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="books"
						value="books"
						v-model="areas.val"
						@blur="clearValidity('areas')"
					/>
					<label for="books">книги</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="kitchen"
						value="kitchen"
						v-model="areas.val"
						@blur="clearValidity('areas')"
					/>
					<label for="kitchen">кухня</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="hobby"
						value="hobby"
						v-model="areas.val"
						@blur="clearValidity('areas')"
					/>
					<label for="hobby">увлечения</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="auto"
						value="auto"
						v-model="areas.val"
						@blur="clearValidity('areas')"
					/>
					<label for="auto">авто</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="ussr"
						value="ussr"
						v-model="areas.val"
						@blur="clearValidity('areas')"
					/>
					<label for="ussr">ссср</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="plants"
						value="plants"
						v-model="areas.val"
						@blur="clearValidity('areas')"
					/>
					<label for="plants">растения</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="pets"
						value="pets"
						v-model="areas.val"
						@blur="clearValidity('areas')"
					/>
					<label for="pets">животные</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="leisure"
						value="leisure"
						v-model="areas.val"
						@blur="clearValidity('areas')"
					/>
					<label for="leisure">отдых</label>
				</div>
				<div>
					<input
						type="checkbox"
						id="others"
						value="others"
						v-model="areas.val"
						@blur="clearValidity('areas')"
					/>
					<label for="others">разное</label>
				</div>
				<p v-if="!areas.isValid">Выберите хотя бы одну подходящую категорию</p>
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
			thumbnail: {
				val: "",
				isValid: true,
			},
			description: {
				val: "",
				isValid: true,
			},
			areas: {
				val: [],
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
			if (this.thumbnail.val === "") {
				this.thumbnail.isValid = false;
				this.formIsValid = false;
			}
			if (this.description.val === "") {
				this.description.isValid = false;
				this.formIsValid = false;
			}
			if (this.areas.val.length === 0) {
				this.areas.isValid = false;
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
				thumbnail: this.thumbnail.val,
				title: this.title.val,
				description: this.description.val,
				areas: this.areas.val,
				price: this.price.val,
			};
			console.log("OfferForm data: ", formData);
			this.$emit("save-data", formData);
			await this.$store.commit("registerOffer", formData);
		},
	},
};
</script>

<style lang="scss" scoped>
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

.checkboxes-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: 50px;

	& h3 {
		grid-column: span 3;
	}
}
</style>
