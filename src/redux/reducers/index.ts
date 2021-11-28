import { combineReducers } from "redux";
import { pokemonsReducer ,selectedPokemonReducer } from "./pokemonReducer"

const reducers = combineReducers({
  allPokemons: pokemonsReducer,
  pokemon : selectedPokemonReducer
});

export default reducers;