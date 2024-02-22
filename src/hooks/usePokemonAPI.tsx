import { useState } from 'react';
import axios from 'axios';
import { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface PokemonData {
  number: number;
  name: string;
}

interface PokemonAPI {
  pokemonData: PokemonData[];
  isLoading: boolean;
  getPokemonsByType: (type: string | number) => Promise<any[]>;
  errora: string | null;
  searchPokemon: (pokemon: number[] | string) => Promise<any>;
  findPokemon: (pokemon: number[] | string | string[]) => Promise<any>;
  findPokeList: (amount: number) => Promise<void>;
}

const usePokemonAPI = (): PokemonAPI => {
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errora, setError] = useState<string | null>(null);

  const findPokemon = async (pokemon: number[] | string | string[]): Promise<any[]> => {
    setIsLoading(true);
    try {
      let responses: AxiosResponse<any, any>[];
      if (Array.isArray(pokemon)) {
        responses = await Promise.all(pokemon.map(id => axios.get(`${API_BASE_URL}/pokemon/${id}`)));
      } else {
        responses = [await axios.get(`${API_BASE_URL}/pokemon/${pokemon}`)];
      }
      return responses.map(response => response.data);
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const searchPokemon = async (pokemon: any): Promise<any> => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/pokemon/${pokemon}`);
      const data = response.data as PokemonData;
      return data;
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  const findPokeList = async (amount: number): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/pokemon?limit=${amount}&offset=0`);
      const promises = response.data.results as PokemonData[];
      setPokemonData(promises);
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getPokemonsByType = async (type: string | number): Promise<any[]> => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/type/${type}`);
      return response.data.pokemon;
    } catch (error) {
      setError((error as Error).message || 'An error occurred');
      return [];
    } finally {
      setIsLoading(false);
    }
  }

  return { pokemonData, isLoading, errora, findPokemon, findPokeList, searchPokemon, getPokemonsByType };
};

export default usePokemonAPI;
