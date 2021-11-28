import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
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

    const [raisedCard, setRaisedCard] = useState(null);

    const [nextUrl, setNextUrl] = useState("");

    const [loadNextPage, setLoadNextPage] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = (pokemon : any) => {
        dispatch(selectedPokemon(pokemon));
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };

    const pokemons = useSelector((state : any) => {
        return [...state.allPokemons.pokemons]
    });

    const loader = useRef(null);

    useEffect(() => {
         var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
         };
       
         const observer = new IntersectionObserver(handleObserver, options);
         console.log(loader)
         if (loader.current) {
            observer.observe(loader.current)
         }

    }, []);

    useEffect(() => {
        if(loadNextPage){
            loadPokemonNextPage();
        }
   }, [loadNextPage]);

    useEffect( () => {
        getPokemons();
     }, [])

     const getPokemons = async () => {
        try {
            const allPokemons : any = await fetchAllPokemons(12 , 0);
           
            if(allPokemons.data.next){
                setNextUrl(allPokemons.data.next)
            }
            dispatch(setPokemons(allPokemons.data.results));
        }catch(error){
            console.log(error)
        }
    }

    const handleObserver = (entities : any) => {
        const target = entities[0];
        if (target.isIntersecting) {   
            console.log("---------------- scroll --------------")
            setLoadNextPage(true)
        }
    }

    const loadPokemonNextPage = async () => {
        console.log(pokemons)

        console.log(nextUrl)
        if(nextUrl){
            const nextPagePokemons : any = await getPokemonListByURL(nextUrl);
            dispatch(setPokemons([...pokemons,...nextPagePokemons.data.results]))
            if(nextPagePokemons.data.next){
                setNextUrl(nextPagePokemons.data.next)
            }
        }
    }

    const onCardHover = (index : any) => {
        setRaisedCard(index)
    }


    const renderList = pokemons.map((pokemon : any , index : number) => {
        return (
            <Grid container direction="row" justifyContent="center" alignItems="center" className="card-container" item xs={2} sm={4} md={4} key={index} >
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

            {/* <div className="loading" ref={loader}>
                    <h2>Load More</h2>
            </div> */}

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