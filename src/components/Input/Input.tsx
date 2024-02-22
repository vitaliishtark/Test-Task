import React, { FC, useState } from "react";
import styles from './Input.module.scss'

type InputProps = {
    onEnter?: (value: string) => void, 
    className?: string,
}

export const Input: FC<InputProps> = ({ className, onEnter }) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onEnter && onEnter(inputValue); 
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
    };

    return (
        <>
            <input 
                className={className ? className : styles.inputStyle} 
                type="text" 
                value={inputValue} 
                onKeyDown={handleKeyDown}
                onChange={handleChange} 
            />
        </>
    );
};
