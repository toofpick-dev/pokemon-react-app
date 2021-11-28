import { ActionTypes } from "../constants/action-types";

export const setPokemons = (pokemons : any) => {
  return {
    type: ActionTypes.SET_POKEMONS,
    payload: pokemons,
  };
};

export const selectedPokemon = (pokemon : any) => {
  return {
    type: ActionTypes.SELECTED_POKEMON,
    payload: pokemon,
  };
};
// export const removeSelectedProduct = () => {
//   return {
//     type: ActionTypes.REMOVE_SELECTED_PRODUCT,
//   };
// };