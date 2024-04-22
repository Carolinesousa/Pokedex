import client from "../pokeapi";

const listPokemons = async (offset = 0, limit = 40) => {
  return await client.get(`/pokemon/?limit=${limit}&offset=${offset}`);
};

export default listPokemons;
