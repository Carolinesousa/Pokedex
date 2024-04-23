<!-- Modal.vue -->
<template>
  <transition name="modal-fade" tabindex="0">
    <div class="modal-mask" v-if="show" @click="close">
      <div
        class="modal-container"
        :style="`background-color: ${color}`"
        autofocus
        @click="preventClickPropagation"
      >
        <div class="nb-modal-header">
          <div class="nb-header">
            <button @click="close" class="nb-close">
              <Arrow />
            </button>
          </div>
          <p>
            {{ titledName }}
            <span class="id">#{{ pokemon.id }}</span>
          </p>
          <span
            v-for="type in pokemon.types"
            :key="type.type.name"
            class="badge nb-badge m-1"
          >
            {{ type.type.name }}
          </span>
        </div>
        <div class="poke-img">
          <img :src="imageHighQualityUrl" alt="" />
        </div>
        <div class="nb-modal-body">
          <ul class="nav nav-tabs card-header-tabs">
            <li :class="getNavItemClass('about')">
              <a class="nav-link" @click="changeTab('about')">{{
                texts.aboutTab
              }}</a>
            </li>
            <li :class="getNavItemClass('movement')">
              <a class="nav-link" @click="changeTab('movement')">{{
                texts.movementTab
              }}</a>
            </li>
            <li :class="getNavItemClass('evolution')">
              <a class="nav-link" @click="changeTab('evolution')">{{
                texts.evolutionTab
              }}</a>
            </li>
            <li :class="getNavItemClass('games')">
              <a class="nav-link" @click="changeTab('games')">{{
                texts.gamesTab
              }}</a>
            </li>
          </ul>
          <div class="about-tab" v-if="currentTab === 'about'">
            <About :pokeAbout="pokemon" :color="color" />
          </div>
          <div v-if="currentTab === 'movement'">
            <MovesTable :pokeMoves="pokemon" :color="color" />
          </div>
          <div v-if="currentTab === 'evolution'">
            <Evolutions :pokemon="pokemon" :color="color" />
          </div>
          <div v-if="currentTab === 'games'">
            <GamesTable :pokeGame="pokemon" :color="color" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import MovesTable from "./MovesTable.vue";
import GamesTable from "./GamesTable.vue";
import Evolutions from "./Evolutions.vue";
import About from "./About.vue";
import Arrow from "./icons/Arrow.vue";
import texts from "@/utils/internationalization";

export default {
  name: "Modal",
  components: {
    MovesTable,
    Evolutions,
    About,
    GamesTable,
    Arrow,
  },
  data() {
    return {
      currentTab: "about",
      texts,
    };
  },
  methods: {
    changeTab(tabName) {
      this.currentTab = tabName;
    },
    preventClickPropagation(e) {
      e.stopPropagation();
    },
    getNavItemClass(name) {
      return `nav-item ${name === this.currentTab ? "nav-item-active" : ""}`;
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    close: {
      type: Function,
      required: true,
    },
  },
  computed: {
    pokemon() {
      return this.$store.state.pokemons.find(
        (pokemon) => pokemon.id === this.$store.state.selectedPokemonId
      );
    },
    color() {
      const color =
        this.pokemon.specie.color.name === "white"
          ? "#cccccc"
          : this.pokemon.specie.color.name;
      return color;
    },
    titledName() {
      const string = this.pokemon.name;
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    imageHighQualityUrl() {
      const baseUrl =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
      return baseUrl + this.pokemon.sprites.front_default.split("/").at(-1);
    },
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 3;

  overflow: auto;
}

.modal-container {
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  width: 600px;
  min-width: 360px;
  max-width: 90%;

  font-size: 1rem;

  overflow-y: auto;
  position: absolute;
  z-index: inherit;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s;
}

.modal-fade-enter,
.modal-fade-leave-to {
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 20px;
  opacity: 0;
}
.nb-modal-body {
  background-color: white;
  width: 100%;
  border-radius: 20px 20px 5px 5px;
  padding: 20px;
  padding-top: 40px;
  min-height: 400px;
}
.nb-header {
  width: 100%;
  color: #fff;
  height: 30px;
  font-size: 1.25rem;
  margin-bottom: 20px;
}
.nb-modal-header {
  padding: 20px;
}
.nb-modal-header p {
  color: #fff;
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0;
}
.id {
  color: #fff;
  float: right;
  font-weight: 600;
  font-size: 1.25rem;
}
.nb-badge {
  background-color: rgba(255, 255, 255, 0.3);
  font-size: 0.75rem !important;
  padding: 6px !important;
}
.poke-img {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 130px;
}
.poke-img img {
  display: flex;
  position: absolute;
  height: 230px;
  width: auto;

  filter: brightness(1.2);
}
.nav-item a {
  font-size: 1rem;
  font-weight: 700;
  color: black;
  text-decoration: none;
}
.nav-item a:hover,
.nav-item-active a {
  font-size: 1rem;
  font-weight: 700;
  color: green;
  text-decoration: none;
}
.nb-close {
  width: 30px;
  color: #fff !important;
}

@media (max-width: 540px), (max-height: 768px) {
  .modal-container {
    top: 20px;
  }
}
</style>
