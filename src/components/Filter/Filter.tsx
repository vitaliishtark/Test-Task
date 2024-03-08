import React, { useEffect, useRef, useState } from 'react'
import styles from './Filter.module.scss'
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import usePokemonAPI from '../../hooks/usePokemon';
import { useLocation, useNavigate } from 'react-router-dom';

interface FilterProps {
    className?: string;
    onDataReceived: (data: any) => void;
}

const Filter: React.FC<FilterProps> = ({ className, onDataReceived }) => {
    const [selectedType, setSelectedType] = useState('');
    const api = usePokemonAPI();
    const allTypesRef = useRef<any[]>([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        api.getPokemonByType(undefined)
            .then((data: any) => {
                const results = data.results;
                allTypesRef.current = results;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const typeQueryParam = queryParams.get('type');

        const fetchData = async () => {
            if (typeQueryParam) {
                const pokemons: any = await api.getPokemonByType(typeQueryParam);
                onDataReceived(pokemons);
                setSelectedType(typeQueryParam);
                navigate(window.location.pathname);
            }
        };

        fetchData();
    }, [location.search]);

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        setSelectedType(event.target.value);
        if (event.target.value === 'all') {
            onDataReceived(event.target.value);
        } else {
            api.getPokemonByType(event.target.value)
                .then((data: any) => {
                    onDataReceived(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    };

    return (
        <div className={className ? className : styles.filter}>
            <Select
                labelId="pokemon-type-label"
                id="pokemon-type"
                value={selectedType}
                onChange={handleTypeChange}
                className={styles.select}
            >
                <MenuItem value="all">All</MenuItem>
                {allTypesRef.current?.map((type: any, index: number) => (
                    <MenuItem key={index} value={type.name}>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default Filter