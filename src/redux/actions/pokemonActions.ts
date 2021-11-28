import { PokemonList } from "../../common/models/pokemon.model";
import { ActionTypes } from "../constants/action-types";

export const setPokemons = (pokemons : PokemonList[]) => {
  return {
    type: ActionTypes.SET_POKEMONS,
    payload: pokemons,
  };
};

export const selectedPokemon = (pokemon : PokemonList) => {
  return {
    type: ActionTypes.SELECTED_POKEMON,
    payload: pokemon,
  };
};