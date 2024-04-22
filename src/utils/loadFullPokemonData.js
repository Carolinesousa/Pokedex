import getPokemonDetails from "@/services/pokeapi/getPokemonDetails";

const loadFullPokemonData = async (results) => {
  const promises = results.map(async (result) => {
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

  return await Promise.all(promises);
};

export default loadFullPokemonData;
