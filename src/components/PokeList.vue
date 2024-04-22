<template>
  <main class="nb-content">
    <Modal :show="isDetailModalOpen" :close="closeModal" />

    <div class="nb-card-container">
      <div class="nb-loading-content" v-if="isLoadingCards">
        <LoadingSpinner :isLoading="isLoadingCards" />
      </div>
      <Card
        v-for="pokemon in pokemons"
        :pokemon="pokemon"
        :key="pokemon.name"
        :open-modal="openModal"
        v-else
      />
    </div>

    <div class="load-more-button-content">
      <LoadingSpinner
        :aria-label="texts.loadingMoreAriaLabel"
        :isLoading="isLoadMoreLoading"
        v-if="isLoadMoreLoading"
      />
      <Button
        v-else-if="showLoadMoreButton"
        class="nb-load-more-button"
        :onclick="handleLoadMore"
      >
        {{ texts.loadMore }}
      </Button>
    </div>
  </main>
</template>
<script>
import Card from "./Card.vue";
import Button from "./Button.vue";
import Modal from "./Modal.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import texts from "@/utils/internationalization";

const POKEMONS_PER_QUERY = 40;

export default {
  name: "poke-list",
  data() {
    return {
      texts,
    };
  },
  computed: {
    pokemons() {
      return this.$store.state.pokemons ?? [];
    },
    showLoadMoreButton() {
      return this.$store.state.canLoadMore;
    },
    isLoadMoreLoading() {
      return (
        this.$store.state.pokemons.length && this.$store.state.isLoadingPokemons
      );
    },
    isLoadingCards() {
      return (
        !this.$store.state.pokemons.length &&
        this.$store.state.isLoadingPokemons
      );
    },
    isDetailModalOpen() {
      return Boolean(this.$store.state.selectedPokemonId);
    },
  },
  methods: {
    openModal(id) {
      this.$store.commit("selectPokemon", id);
    },
    closeModal() {
      this.$store.commit("selectPokemon");
    },
    handleLoadMore() {
      const offset = this.$store.state.offset + POKEMONS_PER_QUERY;
      this.$store.commit("loadPokemons", offset);
    },
    handleScroll() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !this.isLoadMoreLoading &&
        this.$store.state.canLoadMore
      ) {
        this.handleLoadMore();
      }
    },
  },
  mounted() {
    this.$store.commit("loadPokemons");
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: {
    Card,
    Button,
    LoadingSpinner,
    Modal,
  },
};
</script>
<style scoped>
.nb-content {
  background-color: #f5f2f2;
}

.nb-card-container {
  padding: 20px;
  margin: 0 auto;

  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 24px;

  max-width: 1400px;

  z-index: 1;
}

.nb-load-more-button {
  background: #f5f2f2;

  width: 200px;
  min-height: 40px;

  margin: 0 auto;

  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);

  margin: 0 auto;
}

.load-more-button-content {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 20px;
}

.nb-loading-content {
  width: 100%;
  height: calc(100vh - 180px);

  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 560px) {
  .nb-card-container {
    justify-content: center;
  }
}
</style>
