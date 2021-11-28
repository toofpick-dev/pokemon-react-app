import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useRef, useState, useCallback, RefObject  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPokemons, getPokemonListByURL } from "../api/pokemon.service";
import { setPokemons , selectedPokemon } from "../redux/actions/pokemonActions";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography'

import PokemonBall from "../assets/pokemon-ball.svg";
import Modal from '@mui/material/Modal';


import "./PokemonListing.scss";
import PokemonDetail from "../components/PokemonDetail/PokemonDetail";

export default function PokemonListing() {

    const dispatch = useDispatch();

    const observer : any = useRef(null)

    const [isLoading, setIsLoading] = useState(true);

    const [raisedCard, setRaisedCard] = useState(null);

    const [nextUrl, setNextUrl] = useState("");

    const [open, setOpen] = useState(false);

    const handleOpen = (pokemon : any) => {
        dispatch(selectedPokemon(pokemon));
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };

    const pokemons = useSelector((state : any) => {
        console.log("----------------- pokemon list --------------")

        return [...state.allPokemons.pokemons]
    });

    useEffect( () => {
        getPokemons();
     }, [])

     const getPokemons = async () => {
        try {
            const allPokemons : any = await fetchAllPokemons(12 , 0);
            setNextUrl(allPokemons.data.next)
            dispatch(setPokemons(allPokemons.data.results));
            setIsLoading(false)
        }catch(error){
            console.log(error)
        }
    }

    const lastBookElementRef = useCallback(node => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && nextUrl) {
            setIsLoading(true)
            loadPokemonNextPage()
        }
        })
        if (node) observer.current.observe(node)
    }, [ isLoading , nextUrl])

    const loadPokemonNextPage = async () => {
        if(nextUrl){
            const nextPagePokemons : any = await getPokemonListByURL(nextUrl);
            dispatch(setPokemons([...pokemons,...nextPagePokemons.data.results]))
            setNextUrl(nextPagePokemons.data.next)
            setIsLoading(false)
        }
    }

    const onCardHover = (index : any) => {
        setRaisedCard(index)
    }


    const renderList = pokemons.map((pokemon : any , index : number) => {
        return (
            <Grid ref={ index + 1 === pokemons.length ? lastBookElementRef : null} container direction="row" justifyContent="center" alignItems="center" className="card-container" item xs={2} sm={4} md={4} key={index} >
                <Card onClick={() => handleOpen(pokemon)} style={{backgroundColor: "#FBF46D"}} className="pokemon-card" onMouseEnter = {() => onCardHover(index)} onMouseLeave = {() => onCardHover(null)} raised={index === raisedCard} sx={{ maxWidth: 250 }}>
                    <CardMedia
                        className = "card-image"
                        component="img"
                        alt={pokemon.name}
                        height="250"
                        image={PokemonBall}
                    />
                    <CardContent>
                        <Typography style={{fontFamily: "VT323"}} className="text" gutterBottom variant="h3" component="div">
                            {pokemon.name}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
      });

    return (
        <div className="container">

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {renderList}
            </Grid>

           { isLoading && <Box sx={{display: 'flex',flexDirection: 'row',alignItems: 'center' ,justifyContent: 'center'}}>
                    <div>
                        <CircularProgress />
                    </div>
            </Box >}

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                <PokemonDetail />
        </Modal>
           
        </div>
    )
}