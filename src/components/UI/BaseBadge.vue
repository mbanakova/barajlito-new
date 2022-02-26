<template>
	<span class="badge" :class="type">#{{ badgeTitle }}</span>
</template>

<script>
export default {
	props: ["type", "badgeTitle"],
	computed: {
		text() {
			return this.badgeTitle.toUppercase();
		},
	},
};
</script>

<style lang="scss" scoped>
.badge {
	background-color: #e2e2e2;
	padding: 1px 10px;
	font-weight: 700;
	font-size: 12px;
	border-radius: 4px;
}
/* 
.apparel {
  border-color: $bright;
  color: $bright;
}

.home {
  border-color: #fa03e5;
  color: #fa03e5;
}

.toys {
  border-color: #13688f;
  color: #13688f;
}

.sport {
  border-color: #0059ff;
  color: #0059ff;
}

.books {
  border-color: #8a2e0ac2;
  color: #8a2e0ac2;
}

.kitchen {
  border-color: #8d0606;
  color: #8d0606;
}

.hobby {
  border-color: #ca6511;
  color: #ca6511;
}

.auto {
  border-color: #2f2f31;
  color: #2f2f31;
}

.ussr {
  border-color: #ff0000;
  color: #ff0000;
}

.plants {
  border-color: #09a323;
  color: #09a323;
}

.pets {
  border-color: #344407;
  color: #344407;
}

.leisure {
  border-color: #2d4e03;
  color: #2d4e03;
}

.others {
  border-color: #8d006e;
  color: #8d006e;
} */
</style>
