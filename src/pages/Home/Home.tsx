import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import { PokeCard } from '../../components/PokeCard/PokeCard';
import usePokemonAPI from '../../hooks/usePokemonAPI';
import styles from './Home.module.scss';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Footer from "../../components/Footer/Footer"
import { SelectChangeEvent } from '@mui/material/Select';

const Home = () => {
  const [pokemonIds, setPokemonIds] = useState<number[] | string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const location = useLocation();
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
        width: 250,
      },
    },
  };
  const api = usePokemonAPI();

  const createPokemonIds = (amount: number) => {
    const pokemonIds = [];
    for (let i = 1; i <= amount; i++) {
      pokemonIds.push(i);
    }
    return pokemonIds;
  };
  const handleTypeChange = async (e: SelectChangeEvent<string>) => {
    const selectedValue = e.target.value;
    setSelectedType(selectedValue);
    setFilterActive(selectedValue === 'all' ? false : true);
  
    if (selectedValue === 'all') {
      // Fetch all pokemons if the selected value is 'all'
      const allPokemons = await api.findPokemon(createPokemonIds(20));
      setPokemonData(allPokemons);
    } else {
      // Fetch pokemons by type otherwise
      const pokemons = await api.getPokemonsByType(selectedValue);
      const firstTwentyPokemon = pokemons.slice(0, 20).map((pokemon: any) => pokemon.pokemon.name);
      const pokemonData = await api.findPokemon(firstTwentyPokemon);
      setPokemonData(pokemonData);
    }
  };
  


  useEffect(() => {
    if (!location.search) {
      setPokemonIds(createPokemonIds(20));
    }
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      if (pokemonIds.length > 0) {
        setIsLoading(true);
        const pokemons = await api.findPokemon(pokemonIds);
        setPokemonData(pokemons);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pokemonIds]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const typeQueryParam = queryParams.get('type');
    const fetchData = async () => {
      if (typeQueryParam) {
        const pokemons = await api.getPokemonsByType(typeQueryParam);
        const firstTwentyPokemon = pokemons.slice(0, 20).map((pokemon: any) => pokemon.pokemon.name);
        setPokemonData(await api.findPokemon(firstTwentyPokemon));
        setSelectedType(typeQueryParam);
        setFilterActive(true);
      }
    };

    fetchData();
  }, [location.search]);
  return (
    <div className={styles['pokemons-container']}>
      <Header />
      <div className={styles.header}>
        <h1 className={styles.title}>Pokemons!</h1>
        <FormControl className={styles['form-control']} >
          <InputLabel id="pokemon-type-label">Select Pokemon Type</InputLabel>
          <Select
            labelId="pokemon-type-label"
            id="pokemon-type"
            value={selectedType}
            onChange={handleTypeChange}
            label="Select Pokemon Type"
            MenuProps={MenuProps}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="fire">Fire</MenuItem>
            <MenuItem value="water">Water</MenuItem>
            <MenuItem value="electric">Electric</MenuItem>
            <MenuItem value="grass">Grass</MenuItem>
            <MenuItem value="ice">Ice</MenuItem>
            <MenuItem value="fighting">Fighting</MenuItem>
            <MenuItem value="poison">Poison</MenuItem>
            <MenuItem value="ground">Ground</MenuItem>
            <MenuItem value="flying">Flying</MenuItem>
            <MenuItem value="psychic">Psychic</MenuItem>
            <MenuItem value="bug">Bug</MenuItem>
            <MenuItem value="rock">Rock</MenuItem>
            <MenuItem value="ghost">Ghost</MenuItem>
            <MenuItem value="dragon">Dragon</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
            <MenuItem value="steel">Steel</MenuItem>
            <MenuItem value="fairy">Fairy</MenuItem>
          </Select>
        </FormControl>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles['poke-cards']}>
          {pokemonData.map((data: any, index: number) => (
            <PokeCard className={styles['poke-card']} key={index} data={data} />
          ))}
        </div>
      )}
      <Footer className={styles.footer} />
    </div>
  );
};

export default Home;
