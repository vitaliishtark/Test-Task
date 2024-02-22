import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import styles from './Header.module.scss';
import usePokemonAPI from "../../hooks/usePokemonAPI";
import { InputAdornment, Input } from "@mui/material";
import { moveData } from '../../store/pokemon.slice';
import { useDispatch } from 'react-redux';
import zoom from '../../assets/images/zoom.png'
import { useSelector } from 'react-redux';



type HeaderProps = {
  className?: string,
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalid, setInvalid] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const {
    errora,
    searchPokemon,
  } = usePokemonAPI();
  const dispatch = useDispatch();
  const searchForPokemon = async (value: string) => {
    if (value.length > 0) {
      setIsLoading(true);
      const promiseResult = await searchPokemon(value);
      if (promiseResult?.response?.data !== 'Not Found') {
        setInvalid(false);
        dispatch(moveData(promiseResult));
        navigate('/pokeinfo');
      } else {
        setInvalid(true);
      }
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (inputValue === '') {
      setInvalid(false);
    }
  }, [inputValue]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchForPokemon(inputValue);
    }
  };
  return (
    <div className={className ? className : styles.header}>
      <div className={styles.logo}>
        <Link to='/'><img src={logo} alt="logo" /></Link>
      </div>
      <div className={styles.pages}>
      </div>
      <div className={styles.searchBar}>
        <Input
          value={inputValue}
          error={invalid}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.customSearchBarIput}
          placeholder="Enter ID or Name"
          color="error"
          disableUnderline
          startAdornment={
            <InputAdornment position="start">
              <img height={20} width={20} src={zoom} alt="Search" />
            </InputAdornment>
          }
        />
        <div style={invalid ? { display: "block" } : { display: "none" }} className={styles.invalidText}>
          There is no such a pokemon
        </div>
      </div>
    </div>
  );
};

export default Header;
