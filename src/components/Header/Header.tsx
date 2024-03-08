import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/pokelogo.png';
import styles from './Header.module.scss';
import usePokemonAPI from "../../hooks/usePokemon";
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon } from '../../store/pokemon.slice';
import { SearchBar } from "../SearchBar/SearchBar";

type HeaderProps = {
  className?: string,
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchFailed, setSearchFailed] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = usePokemonAPI();

  const handleSearchFinished = async (pokemon: string) => {
    setIsLoading(true);
    api.searchPokemon(pokemon);
    setIsLoading(false);
  };

  useEffect(() => {
    if (api.error !== null) {
      console.log(api.error, 'errrrrr')
      setSearchFailed(true);
      api.setError('');
    } else {
      setSearchFailed(false);
    }
  }, [api.error])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (api.searchedPokemon) {
        dispatch(addPokemon(api.searchedPokemon));
      }
      if (api?.searchedPokemon?.name) {
        navigate(`/${api.searchedPokemon.name}`);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [api.searchedPokemon]);

  return (
    <div className={className ? className : styles.header}>
      <div className={styles.logo}>
        <Link to='/'><img src={logo} alt="logo" /></Link>
      </div>
      <div className={styles.pages}>
      </div>
      <div className={styles.searchBar}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <SearchBar pokemonNotFound={searchFailed} setSearchFailed={setSearchFailed} onSearchFinished={handleSearchFinished} />
        )}
      </div>
    </div>
  );
};

export default Header;
