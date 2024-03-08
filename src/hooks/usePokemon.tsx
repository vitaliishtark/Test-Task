import { useState } from 'react';
import { PokemonApi } from '../api/PokemonApi';

interface PokemonData {
  number: number;
  name: string;
  type: string;
  results: []
}

interface PokemonAPI {
  foundPokemon: PokemonData[];
  searchedPokemon: PokemonData | null;
  pokemonType: any;
  isLoading: boolean;
  error: string | null;
  searchPokemon: (pokemon: string | number) => any;
  findPokemon: (pokemon: string) => Promise<any>;
  findPokeList: (amount: number, offset?: number) => Promise<any>;
  getPokemonByType: (type: string | undefined) => Promise<void>;
  setError: (error: string | null) => void;
}

const usePokemonAPI = (): PokemonAPI => {
  const [foundPokemon, setFoundPokemon] = useState<PokemonData[]>([]);
  const [pokemonType, setPokemonType] = useState<PokemonData[]>([]);
  const [searchedPokemon, setSearchedPokemon] = useState<PokemonData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const api = new PokemonApi();

  const findPokemon = async (pokemon: string): Promise<any> => {
    setIsLoading(true);
    try {
      const response = await api.findPokemon(pokemon, {});
      setError(null);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      setIsLoading(false);
      return null;
    }
  };

  const getPokemonByType = async (type: string | undefined): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await api.getPokemonTypes(type, {});
      setPokemonType([response.data]);
      setError(null);
      return response.data;
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const searchPokemon = async (pokemon: string | number): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await api.findPokemon(pokemon.toString(), {});
      setSearchedPokemon(response.data);
      setError(null);
      setFoundPokemon([response.data]);
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      console.log('an error ')
    } finally {
      setIsLoading(false);
    }
  };

  const findPokeList = async (amount: number, offset?: number): Promise<any[]> => {
    setIsLoading(true);
    try {
      const response: any = await api.getPokeList(amount, offset);
      setFoundPokemon(response.data.results);
      setError(null);
      return response.data;
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      return [];
    } finally {
      setIsLoading(false);
    }
  };


  return { pokemonType, setError, foundPokemon, searchedPokemon, isLoading, error, findPokeList, findPokemon, searchPokemon, getPokemonByType };
};

export default usePokemonAPI;