import { Box, CircularProgress } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { useEffect ,useState } from "react";
import { useSelector } from "react-redux";
import { getPokemonListByURL } from "../../api/pokemon.service";
import { PokemonList } from "../../common/models/pokemon.model";
import { typeColor } from "../../common/utils/constants";
import "./PokemonDetail.scss";

const style : SxProps<Theme> = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    p: 4,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

export default function PokemonDetail() {

    const pokemon = useSelector((state : {allPokemons : {pokemons : PokemonList[] } , pokemon : PokemonList}) => {
        return {...state.pokemon}
    });

    const [hp, sethp] = useState(null)
    const [imgSrc, setimgSrc] = useState("")
    const [pokeName, setpokeName] = useState(null)
    const [statAttack, setstatAttack] = useState(null)
    const [statDefense, setstatDefense] = useState(null)
    const [statSpeed, setstatSpeed] = useState(null)
    const [themeColor, setthemeColor] = useState("")
    const [types, settypes] = useState([])

    const [isLoading, setisLoading] = useState(true)

      useEffect( () => {
        getPokemon();
     }, [])

     const getPokemon = async () => {
        try {
            const pokemonDetails : any = await getPokemonListByURL(pokemon.url);
            sethp(pokemonDetails.data.stats[0].base_stat);
            setimgSrc(pokemonDetails.data.sprites.other.dream_world.front_default) ;
            setpokeName(pokemonDetails.data.name[0].toUpperCase() + pokemonDetails.data.name.slice(1));
            setstatAttack(pokemonDetails.data.stats[1].base_stat);
            setstatDefense(pokemonDetails.data.stats[2].base_stat);
            setstatSpeed(pokemonDetails.data.stats[5].base_stat);
            const key : string = pokemonDetails.data.types[0].type.name;
            setthemeColor(typeColor[key]);
            settypes(pokemonDetails.data.types);

            setisLoading(false);
        }catch(error){
            console.log(error)
        }
    }

    return (
        <Box sx={style}>
            {!isLoading && imgSrc ?
                <div style={{background: `radial-gradient(circle at 50% 0%, ${themeColor} 36%, #ffffff 36%)`}} id="card">
                    <p className="hp">
                        <span>HP </span>
                        {hp}
                    </p>
                    <img src={imgSrc} />
                    <h2 className="poke-name">{pokeName}</h2>
                    <div className="types">
                        {types.map((type : any) => {
                            return <span style={{backgroundColor: themeColor}}>{type.type.name}</span>
                        })}
                    </div>
                    <div className="stats">
                        <div>
                            <h3>{statAttack}</h3>
                            <p>Attack</p>
                        </div>
                        <div>
                            <h3>{statDefense}</h3>
                            <p>Defense</p>
                        </div>
                        <div>
                            <h3>{statSpeed}</h3>
                            <p>Speed</p>
                        </div>
                    </div>
                </div>:
                <Box sx={{display: 'flex',flexDirection: 'row',alignItems: 'center' ,justifyContent: 'center'}} className="loading">
                    <div>
                        <CircularProgress />
                    </div>
                </Box >
            }
            </Box> 
    );
}
