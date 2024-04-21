<template>
  <main class="nb-content">
    <div class="nb-card-container">
      <Card
        v-for="pokemon in pokemons"
        :pokemon="pokemon"
        :key="pokemon.name"
      />
    </div>

    <div class="load-more-button-content">
      <LoadingSpinner
        aria-label="Loading more Pokemons"
        :isLoading="isLoadMoreLoading"
        v-if="isLoadMoreLoading"
      />
      <Button
        v-else-if="showLoadMoreButton"
        class="nb-load-more-button"
        :onclick="handleLoadMore"
      >
        Load More
      </Button>
    </div>
  </main>
</template>
<script>
import Card from "./Card.vue";
import Button from "./Button.vue";
import LoadingSpinner from "./LoadingSpinner.vue";

const POKEMONS_PER_QUERY = 40;

export default {
  name: "poke-list",
  data() {
    return {
      isLoadMoreLoading: false,
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
  },
  methods: {
    handleLoadMore() {
      const offset = this.$store.state.offset + POKEMONS_PER_QUERY;
      this.$store.commit("loadPokemons", offset);
    },
  },
  mounted() {
    this.$store.commit("loadPokemons");

    window.addEventListener();
  },
  components: {
    Card,
    Button,
    LoadingSpinner,
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

@media (max-width: 560px) {
  .nb-card-container {
    justify-content: center;
  }
}
</style>
