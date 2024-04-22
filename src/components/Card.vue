<template>
  <div
    tabindex="0"
    :aria-label="`Card for ${titledName}`"
    class="nb-card"
    @click="handleSelectPokemon"
    @keypress="handleTapEnter"
  >
    <div class="card-img" :style="imageBackgroundColor">
      <img :src="imageHighQualityUrl" alt="" />
    </div>
    <div class="nb-card-body">
      <h3>
        {{ titledName }}
        <span class="id">#{{ pokemon.id }}</span>
      </h3>

      <p>{{ description }}</p>
    </div>
    <div class="nb-card-footer">
      <span
        v-for="type in pokemon.types"
        :key="type.type.name"
        class="badge p-2"
        :style="imageBackgroundColor"
      >
        {{ type.type.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    pokemon: Object,
    openModal: Function,
  },
  methods: {
    handleSelectPokemon() {
      this.openModal(this.pokemon.id);
    },
    handleTapEnter(e) {
      if (e.key === "Enter") this.handleSelectPokemon();
    },
  },
  computed: {
    imageBackgroundColor() {
      return `background-color: ${this.pokemon.specie.color.name}`;
    },

    imageHighQualityUrl() {
      const baseUrl =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
      return baseUrl + this.pokemon.sprites.front_default.split("/").at(-1);
    },

    titledName() {
      const string = this.pokemon.name;
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    description() {
      const pokemonMultiLanguageDescription =
        this.pokemon.specie.flavor_text_entries;

      const description = pokemonMultiLanguageDescription.find(
        (description) => description.language.name === "en"
      );

      return description?.flavor_text;
    },
  },
};
</script>
<style scoped>
.nb-card {
  border-radius: 0.375rem;
  box-shadow: 0 10px 16px -10px rgba(0, 0, 0, 0.1);

  cursor: pointer;

  flex-basis: calc(25% - 20px);
  min-width: 250px;

  display: flex;
  flex-direction: column;

  overflow: hidden;

  transition-property: box-shadow, border-radius;
  transition-delay: 200ms;
  transition-timing-function: linear;

  z-index: 1;
}

.nb-card:hover,
.nb-card-active,
.nb-card:focus {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
}

.nb-card-footer {
  background-color: #fff;
  display: flex;
  flex-direction: row;

  gap: 4px;
  padding: 1rem;
}

.nb-card-body {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1rem 1rem 0;
}

.card-img {
  height: 200px;
  max-width: 100%;
  padding: 1rem;

  filter: brightness(0.8);
}

.card-img img {
  display: block;
  margin: 0 auto;

  height: 180px;
  width: auto;

  filter: brightness(1.2);
}

.id {
  color: #cfd8dc;
  float: right;
  font-weight: 400;
}

@media (max-width: 1080px) {
  .nb-card {
    flex-basis: calc(33% - 14px);
  }
}

@media (max-width: 920px) {
  .nb-card {
    flex-basis: calc(50% - 14px);
  }
}

@media (max-width: 560px) {
  .nb-card {
    flex-basis: 80%;
  }
}
</style>
