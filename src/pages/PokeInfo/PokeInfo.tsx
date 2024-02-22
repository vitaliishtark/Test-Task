import React from "react";
import usePokemonAPI from '../../hooks/usePokemonAPI';
import styles from './PokeInfo.module.scss'
import Header from '../../components/Header/Header';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { giveType } from '../../store/pokemon.slice';
import Footer from "../../components/Footer/Footer";

type PokeInfoProps = {
    className?: string,
}

interface PokemonType {
    type: {
        name: string;
    }
}

interface PokemonMove {
    move: {
        name: string;
    }
}

export const PokeInfo: React.FC<PokeInfoProps> = ({ className }) => {
    const myData = useSelector((state: any) => state.pokemonReducer.data);
    const lastPokemon = myData[myData.length - 1];
    const TypesColor: { [key: string]: string } = {
        grass: '#9bcc50',
        fire: '#fd7d24',
        water: '#6390f0',
        bug: '#729f3f',
        poison: '#b97fc9',
        ice: '#51c4e7',
        flying: '#bdb9b8',
        psychic: '#f366b9',
        normal: '#a4acaf',
        fighting: '#d56723',
        electric: '#eed535',
        fairy: '#fdb9e9',
        dragon: '#7038f8',
        ground: '#ab9842',
        rock: '#a38c21',
        ghost: '#7b62a3',
        steel: '#9eb7b8',
        dark: '#707070',
    };


    return (
        <>
            <Header />
            <div className={className ? className : styles.pokeInfo}>
                {lastPokemon && (
                    <>
                        <div className={styles.header}>
                            <Link className={styles.backLink} to='/'>Go Back</Link>
                            <h4>{lastPokemon.name.toUpperCase()} #{lastPokemon.id}</h4>
                        </div>
                        <div className={styles.pokeData}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    className={styles.img}
                                    component="img"
                                    alt={lastPokemon.name}
                                    height="300"
                                    image={lastPokemon.sprites.other['official-artwork'].front_default}
                                />
                            </Card>
                            <div className={styles.info}>
                                <h3>Moves</h3>
                                <div className={styles.moves}>
                                    {lastPokemon.moves && lastPokemon.moves.slice(0, 4).map((move: PokemonMove, index: number) => (
                                        <p key={index}>{move.move.name.toUpperCase()}</p>
                                    ))}
                                </div>
                                <h3>Types</h3>
                                <div className={styles.types}>
                                    {lastPokemon.types && lastPokemon.types.map((soloType: PokemonType, index: number) => (
                                        <Link to={`/?type=${soloType.type.name}`} key={index} className={styles.type}>
                                            <p
                                                style={{ backgroundColor: TypesColor[soloType.type.name.toLowerCase()] }}
                                                key={index}
                                            >
                                                {soloType.type.name.toUpperCase()}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <Footer className={styles.footer}/>
            </div>
        </>
    );
};

export default PokeInfo;
