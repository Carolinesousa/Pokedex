import client from "../pokeapi"

const listPokemons = async (offset = 0) => {
  return await client.get(`/pokemon/?limit=40&offset=${offset}`)
}

export default listPokemons
