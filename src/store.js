import { createStore } from "vuex";
import listPokemons from "./services/pokeapi/listPokemons";
import getPokemonDetails from "./services/pokeapi/getPokemonDetails";
import loadFullPokemonData from "./utils/loadFullPokemonData";

const store = createStore({
  state() {
    return {
      // Pokemon list states
      offset: 0,
      isLoadingPokemons: false,
      pokemons: [],
      canLoadMore: false,
      selectedPokemonId: null,
    };
  },
  mutations: {
    selectPokemon(state, id = null) {
      state.selectedPokemonId = id;
    },
    async searchPokemons(state, q) {
      state.isLoadingPokemons = true;

      listPokemons(0, 100000)
        .then(async (response) => {
          const results = response.data.results.filter((result) =>
            result.name.includes(q.toLowerCase())
          );

          state.pokemons = await loadFullPokemonData(results);
          state.canLoadMore = false;
          state.offset = 0;
        })
        .finally(() => (state.isLoadingPokemons = false));
    },
    loadPokemons(state, offset = 0) {
      state.isLoadingPokemons = true;
      let canLoadMore = false;

      listPokemons(offset).then(async (response) => {
        canLoadMore = !!response.data.next;
        state.pokemons = await loadFullPokemonData(response.data.results);
        state.offset = offset;
        state.isLoadingPokemons = false;
        state.canLoadMore = canLoadMore;
      });
    },
  },
});

export default store;
