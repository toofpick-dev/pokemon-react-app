import { ActionTypes } from "../constants/action-types";

const intialState = {
  pokemons: [],
  pokemon: {}
};

export const pokemonsReducer = (state = intialState, { type  , payload   } : {type : string , payload :any} ) => {
  switch (type) {
    case ActionTypes.SET_POKEMONS:
      return { ...state, pokemons: payload };
    default:
      return state;
  }
};

export const selectedPokemonReducer = (state = {}, { type, payload } : {type : string , payload :any}) => {
  switch (type) {
    case ActionTypes.SELECTED_POKEMON:
      return { ...state, ...payload };
    default:
      return state;
  }
};