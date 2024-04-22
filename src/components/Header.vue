<template>
  <div class="nb-banner">
    <div class="nb-search">
      <input
        type="text"
        :placeholder="texts.searchPlaceholder"
        :value="inputSearch"
        @input="handleInputSearch"
        @keypress="handleInputSearchOnEnter"
      />
      <Button :isIcon="true" :onclick="handleSearch" class="nb-search-button">
        <Search />
      </Button>
      <select
        class="nb-select form-control"
        name="language"
        :value="language"
        @input="handleSelectLanguage"
      >
        <option value="en"><span>🇬🇧</span> EN</option>
        <option value="es"><span>🇪🇸</span> ES</option>
        <option value="pt"><span>🇧🇷</span> PT</option>
      </select>
    </div>
    <div class="nb-logo-container">
      <img src="../assets/logo.png" />
    </div>
  </div>
</template>

<script>
import { getLanguage, setLanguage } from "@/utils/internationalization";
import Button from "./Button.vue";
import Search from "./icons/Search.vue";
import texts from "@/utils/internationalization";
export default {
  name: "header-banner",
  data() {
    return {
      inputSearch: "",
      language: getLanguage(),
      texts: texts,
    };
  },
  components: {
    Button,
    Search,
  },
  methods: {
    handleSearch() {
      if (this.inputSearch === "") this.$store.commit("loadPokemons", 0);
      else this.$store.commit("searchPokemons", this.inputSearch);
    },
    handleInputSearch(e) {
      this.inputSearch = e.target.value;
    },
    handleSelectLanguage(e) {
      setLanguage(e.target.value);
      window.location.reload();
    },
    handleInputSearchOnEnter(e) {
      if (e.key === "Enter") this.handleSearch();
    },
  },
};
</script>

<style scoped>
.nb-banner {
  background-color: #d94d3a;

  color: #fff;
  text-align: left;

  min-height: 180px;

  display: flex;
  justify-content: flex-start;
  flex-direction: column-reverse;

  padding: 20px;
}

.nb-banner > div {
  flex-basis: 50%;
}

.nb-search {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  gap: 8px;
  padding: 20px;
}

.nb-search input {
  border: 0;
  border-radius: 24px;
  color: #333;
  background-color: #fff;
  font-size: 1.25rem;
  height: 48px;
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
  background-color: #fdca05;
}
.nb-search-button svg {
  fill: #527cde;
}
.nb-select {
  width: auto;
  height: 48px;
  color: #000;
  background-color: #fdca05;
  color: #527cde;

  border: none;
}

.nb-select:focus {
  background-color: #fdca05;
  outline: none;
}

.nb-select,
.nb-select option {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nb-select span {
  font-size: 1.25rem;
}
</style>
