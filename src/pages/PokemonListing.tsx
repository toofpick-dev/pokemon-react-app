import { useEffect } from "react";
import { fetchAllPokemons } from "../api/pokemon.service";

export default function PokemonListing() {
    
    useEffect( () => {
        const getPokemons = async () => {
            const allPokemons = await fetchAllPokemons(10 , 1)
            console.log(allPokemons)
        }
       getPokemons();
    }, [])
    return (
        <div>
            <p>all pokemons</p>
        </div>
    )
}
