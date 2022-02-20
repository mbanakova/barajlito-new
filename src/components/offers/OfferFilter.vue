<template>
  <base-card>
    <h2>Filter by tags:</h2>
    <div class="filters__list">
      <label for="apparel">
        <input type="checkbox" id="apparel" checked @change="setFilter" />
        <span class="check"></span>
        apparel</label
      >
      <label for="home">
        <input type="checkbox" id="home" checked @change="setFilter" /><span
          class="check"
        ></span>
        home</label
      >
      <label for="toys">
        <input type="checkbox" id="toys" checked @change="setFilter" /><span
          class="check"
        ></span>
        toys</label
      >
      <label for="sport">
        <input type="checkbox" id="sport" checked @change="setFilter" /><span
          class="check"
        ></span>
        sport</label
      >
      <label for="books">
        <input type="checkbox" id="books" checked @change="setFilter" /><span
          class="check"
        ></span>
        books</label
      >
      <label for="kitchen">
        <input type="checkbox" id="kitchen" checked @change="setFilter" /><span
          class="check"
        ></span>
        kitchen</label
      >
      <label for="hobby">
        <input type="checkbox" id="hobby" checked @change="setFilter" /><span
          class="check"
        ></span>
        hobby</label
      >
      <label for="auto">
        <input type="checkbox" id="auto" checked @change="setFilter" /><span
          class="check"
        ></span>
        auto</label
      >
      <label for="ussr">
        <input type="checkbox" id="ussr" checked @change="setFilter" /><span
          class="check"
        ></span>
        ussr</label
      >
      <label for="plants">
        <input type="checkbox" id="plants" checked @change="setFilter" /><span
          class="check"
        ></span>
        plants</label
      >
      <label for="pets">
        <input type="checkbox" id="pets" checked @change="setFilter" /><span
          class="check"
        ></span>
        pets</label
      >
      <label for="leisure">
        <input type="checkbox" id="leisure" checked @change="setFilter" /><span
          class="check"
        ></span>
        leisure</label
      >
      <label for="others">
        <input type="checkbox" id="others" checked @change="setFilter" /><span
          class="check"
        ></span>
        others</label
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

<style scoped>
h2 {
  margin: 0 0 25px;
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
  background-color: transparent;
  border: none;
}

label {
  padding: 5px 10px 5px 33px;
  position: relative;
  display: block;
  background-color: #e2e2e2;
  cursor: pointer;
  border-radius: 15px;
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
  border: 2px solid #275a81;
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

label input[type="checkbox"]:checked {
  color: white;
  background-color: #275a81;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
