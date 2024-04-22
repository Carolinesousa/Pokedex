<template>
  <div class="nb-banner">
    <div class="nb-search">
      <input
        type="text"
        placeholder="Pesquise por Pokemons"
        :value="inputSearch"
        @input="handleInputSearch"
      />
      <Button :isIcon="true" :onclick="handleSearch" class="nb-search-button">
        <Search />
      </Button>
    </div>
    <div class="nb-logo-container">
      <img src="../assets/logo.png" />
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
import Search from "./icons/Search.vue";
export default {
  name: "header-banner",
  data() {
    return {
      inputSearch: "",
    };
  },
  components: {
    Button,
    Search,
  },
  methods: {
    handleSearch() {
      this.$store.commit("searchPokemons", this.inputSearch);
    },
    handleInputSearch(e) {
      this.inputSearch = e.target.value;
    },
  },
};
</script>

<style scoped>
.nb-banner {
  background-color: #d94d3a;

  color: #fff;
  text-align: left;

  height: 180px;

  display: flex;
  justify-content: flex-start;
  flex-direction: column-reverse;
}

.nb-banner > div {
  flex-basis: 50%;
}

.nb-search {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.nb-search input {
  border: 0;
  border-radius: 24px;
  color: #333;
  background-color: #fff;
  font-size: 20px;
  height: 48px;
  margin-right: 0.5rem;
  padding-inline-start: 1.2rem;
  width: 560px;
}

.nb-logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nb-logo-container img {
  display: block;
  width: 10%;
  min-width: 150px;
  height: auto;
}

.nb-search-button {
  background-color: rgb(255, 245, 157);
}
</style>
