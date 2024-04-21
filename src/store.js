import { createStore } from "vuex";
import listPokemons from "./services/pokeapi/listPokemons";
import getPokemonDetails from "./services/pokeapi/getPokemonDetails";

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
    loadPokemons(state, offset = 0) {
      state.isLoadingPokemons = true;
      let canLoadMore = false;

      listPokemons(offset).then(async (response) => {
        canLoadMore = !!response.data.next;
        const promises = response.data.results.map(async (result) => {
          const pokemonDetail = await getPokemonDetails(result.url).then(
            (response) => response.data
          );
          const specieDetail = await getPokemonDetails(
            pokemonDetail.species.url
          ).then((response) => response.data);

          return {
            ...pokemonDetail,
            specie: { ...specieDetail },
          };
        });

        state.pokemons = [...state.pokemons, ...(await Promise.all(promises))];
        state.offset = offset;
        state.isLoadingPokemons = false;
        state.canLoadMore = canLoadMore;
      });
    },
  },
});

export default store;
