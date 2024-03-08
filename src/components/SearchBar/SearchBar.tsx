import React from 'react'
import { useState } from 'react'
import styles from './SearchBar.module.scss'

type SearchBarProps = {
    className?: string,
    onSearchFinished: (pokemon: string) => void;
    setSearchFailed?: any
    pokemonNotFound: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ className, onSearchFinished, pokemonNotFound, setSearchFailed }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearchFinished(inputValue.toLowerCase());
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchFailed(false)
        setInputValue(event.target.value);
    };

    return (
        <>
            <input
                className={className ? className : styles.searchBar}
                type="text"
                value={inputValue}
                onKeyDown={handleKeyPressed}
                onChange={handleInputChange}
            />
            <div style={{ display: pokemonNotFound ? 'block' : 'none' }} className={styles.notFound}>We couldn't find such a pokemon</div>
        </>
    )
}
