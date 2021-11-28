import axios from "axios"
import { EndPoints } from "./endPoints"

export const fetchAllPokemons = (limit : number , page : number) => {
    const endPoint = `${EndPoints.pokemon}?limit=${limit}&offset=${page}`
    return axios.get(endPoint)
}

export const getPokemonListByURL = (url : string) => {
    return axios.get(url)
}

