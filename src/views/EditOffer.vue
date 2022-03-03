<template>
	<main class="wrapper">
		<h1>Редактировать объявление «{{ this.editedOffer.title }}»</h1>
		<base-card>
			<form @submit.prevent="submitEditedForm">
				<div class="form-control">
					<label for="title">title</label>
					<input
						:class="{ invalid: !title.isValid }"
						type="text"
						v-model.trim="this.editedOffer.title"
						id="title"
						@blur="clearValidity('title')"
					/>
				</div>
				<div class="form-control" :class="{ invalid: !thumbnail.isValid }">
					<input
						type="text"
						name=""
						id="thumbnail"
						v-model.trim="this.editedOffer.thumbnail"
						@blur="clearValidity('thumbnail')"
					/>
					<p v-if="!thumbnail.isValid">Добавьте фото</p>
				</div>
				<div class="form-control">
					<label for="description">description</label>
					<textarea
						:class="{ invalid: !description.isValid }"
						id="description"
						v-model.trim="this.editedOffer.description"
						rows="5"
						@blur="clearValidity('description')"
					/>
				</div>
				<div class="form-control">
					<label for="price">price</label>
					<input
						:class="{ invalid: !price.isValid }"
						type="number"
						id="price"
						v-model.number="this.editedOffer.price"
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
							v-model="this.editedOffer.areas"
						/>
						<label for="apparel">одежда</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="home"
							value="home"
							v-model="this.editedOffer.areas"
							@blur="clearValidity('areas')"
						/>
						<label for="home">дом</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="toys"
							value="toys"
							v-model="this.editedOffer.areas"
							@blur="clearValidity('areas')"
						/>
						<label for="toys">игрушки</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="sport"
							value="sport"
							v-model="this.editedOffer.areas"
							@blur="clearValidity('areas')"
						/>
						<label for="sport">спорт</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="books"
							value="books"
							v-model="this.editedOffer.areas"
							@blur="clearValidity('areas')"
						/>
						<label for="books">книги</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="kitchen"
							value="kitchen"
							v-model="this.editedOffer.areas"
							@blur="clearValidity('areas')"
						/>
						<label for="kitchen">кухня</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="hobby"
							value="hobby"
							v-model="this.editedOffer.areas"
							@blur="clearValidity('areas')"
						/>
						<label for="hobby">увлечения</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="auto"
							value="auto"
							v-model="this.editedOffer.areas"
							@blur="clearValidity('areas')"
						/>
						<label for="auto">авто</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="ussr"
							value="ussr"
							v-model="this.editedOffer.areas"
							@blur="clearValidity('areas')"
						/>
						<label for="ussr">ссср</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="plants"
							value="plants"
							v-model="this.editedOffer.areas"
							@blur="clearValidity('areas')"
						/>
						<label for="plants">растения</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="pets"
							value="pets"
							v-model="this.editedOffer.areas"
							@blur="clearValidity('areas')"
						/>
						<label for="pets">животные</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="leisure"
							value="leisure"
							v-model="this.editedOffer.areas"
							@blur="clearValidity('areas')"
						/>
						<label for="leisure">отдых</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="others"
							value="others"
							v-model="this.editedOffer.areas"
							@blur="clearValidity('areas')"
						/>
						<label for="others">разное</label>
					</div>
					<p v-if="!areas.isValid">
						Выберите хотя бы одну подходящую категорию
					</p>
				</div>
				<p v-if="!formIsValid">Заполните обязательные поля перед отправкой.</p>

				<div class="links">
					<base-button mode="bright" class="submit">Сохранить</base-button>
					<router-link to="/home" class="base-button">Отмена</router-link>
				</div>
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
			if (this.thumbnail.val === "") {
				this.thumbnail.isValid = false;
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
			if (this.areas.val.length === 0) {
				this.areas.isValid = false;
				this.formIsValid = false;
			}
		},
		async submitEditedForm() {
			// this.validateForm();

			// if (!this.formIsValid) {
			// 	return;
			// }

			const editedOffer = {
				uid: this.uid,
				offerId: this.editedOffer.id,
				thumbnail: this.editedOffer.thumbnail,
				date: new Date().toLocaleDateString(),
				title: this.editedOffer.title,
				description: this.editedOffer.description,
				areas: this.editedOffer.areas,
				price: this.editedOffer.price,
			};
			await this.$store.dispatch("editOffer", editedOffer);
			this.$router.push("/");
		},
	},
};
</script>
<style lang="scss" scoped>
form {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

label {
	font-weight: bold;
	display: block;
	margin-bottom: 10px;
}

input[type="checkbox"] + label {
	font-weight: normal;
	display: inline;
	margin: 0 0 0 20px;
}

.invalid {
	border-color: $med-accent;
}

p {
	margin: 0;
}
.checkboxes-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-column-gap: 50px;

	& h3 {
		grid-column: span 3;
	}
}

.submit {
	align-self: flex-start;
}
.links {
	grid-area: links;
	display: flex;
	gap: 20px;
	align-items: center;
}
</style>
