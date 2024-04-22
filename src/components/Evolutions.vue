<template>
  <div class="nb-container">
    <div v-if="isLoading">
      <LoadingSpinner :isLoading="isLoading" />
    </div>
    <div
      v-else
      v-for="(evolution, index) in evolutions"
      :key="index"
      class="evolution-step"
    >
      <div
        v-if="!!evolution?.name"
        class="step-circle"
        :style="imageBackgroundColor"
      >
        <p>
          {{ evolution.name }}
        </p>
      </div>
      <div
        v-if="index < evolutions.length - 1 && !!evolution?.name"
        class="arrow"
      >
        <Arrow />
      </div>
    </div>
  </div>
</template>

<script>
import getPokemonDetails from "@/services/pokeapi/getPokemonDetails";

import Arrow from "./icons/Arrow.vue";
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
  name: "Evolutions",
  components: {
    Arrow,
    LoadingSpinner,
  },
  props: {
    pokemon: {
      type: Array,
      required: true,
    },
    imageBackgroundColor: {
      type: String,
      default: "blue",
    },
  },
  data() {
    return {
      isLoading: true,
      evolutions: [],
    };
  },
  method: {
    getImageHighQualityUrl(pokemonImageUrl) {
      const baseUrl =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
      return baseUrl + pokemonImageUrl.split("/").at(-1);
    },
  },
  mounted() {
    this.isLoading = true;

    getPokemonDetails(this.pokemon.specie.evolution_chain.url)
      .then(({ data }) => {
        const chain = data.chain;

        this.evolutions = [
          chain?.species,
          chain?.evolves_to[0]?.species,
          chain?.evolves_to[0]?.evolves_to[0]?.species,
        ].filter((evolution) => evolution);
      })
      .finally(() => (this.isLoading = false));
  },
};
</script>

<style scoped>
.nb-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;

  padding: 20px;
}

.evolution-step {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 20px;
}

.step-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  filter: brightness(1.2);
  border: 4px solid white;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.3);
}
.step-circle p {
  color: #000;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0;
}

.arrow {
  margin: 0 10px;
  font-size: 1.25rem;
  width: 30px;

  transform: rotate(180deg);
}

@media (max-width: 430px) {
  .nb-container,
  .evolution-step {
    flex-direction: column;
  }

  .arrow {
    transform: rotate(270deg);
  }

  .step-circle {
    width: 100px;
    height: 100px;
  }
}
</style>
