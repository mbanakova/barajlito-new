<template>
	<main class="wrapper">
		<base-popup :show="!!error" title="Данные не подгрузились" @close="gotIt">
			<p>{{ error }}</p>
		</base-popup>
		<h1>Страница в разработке, запросы приходят, но ответить пока нельзя.</h1>
		<div v-if="isLoading">
			<base-spinner></base-spinner>
		</div>
		<ul v-else-if="hasRequests && !isLoading">
			<RequestItem
				v-for="request in receivedRequests"
				:key="request.id"
				:from="request.userName"
				:message="request.message"
				:thumbnail="request.thumbnail"
				:when="request.time"
				:title="request.title"
			/>
		</ul>
		<h3 v-else>Вам пока никто не написал</h3>
	</main>
</template>

<script>
import RequestItem from "@/components/requests/RequestItem";
export default {
	components: { RequestItem },
	data() {
		return { isLoading: false, error: null };
	},
	created() {
		this.loadRequests();
	},
	computed: {
		receivedRequests() {
			return this.$store.getters["requests"];
		},
		hasRequests() {
			return this.$store.getters["hasRequests"];
		},
	},
	methods: {
		async loadRequests() {
			this.isLoading = true;
			try {
				await this.$store.dispatch("fetchRequests");
			} catch (error) {
				this.error = error.message;
			}
			this.isLoading = false;
		},
		gotIt() {
			this.error = null;
		},
	},
};
</script>

<style lang="scss" scoped></style>
