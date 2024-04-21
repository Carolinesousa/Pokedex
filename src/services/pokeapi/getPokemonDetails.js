import axios from "axios";

const getPokemonDetails = async (url) => {
  return await axios.get(url);
};

export default getPokemonDetails;
