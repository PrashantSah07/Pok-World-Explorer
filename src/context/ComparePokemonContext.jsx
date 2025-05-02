import React, { createContext, useState, useContext, useEffect } from 'react';

export const ComparePokemonContext = createContext();

export const ComparePokemonProvider = ({ children }) => {
    const [selected, setSelected] = useState([]);
    const [isDisabled, setIsDisabled] = useState(null);

    const addPokemon = (id) => {
        setSelected(prev => {
            if (prev.includes(id)) {
                return prev.filter(pokeId => pokeId !== id);
            }
            if (prev.length < 2) {
                return [...prev, id];
            }
            return [...prev.slice(1), id];
        });
    };

    useEffect(() => {
        if (selected.length === 2) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true);
        }
    }, [selected]);

    return (
        <ComparePokemonContext.Provider value={{ selected, setSelected, addPokemon, isDisabled }}>
            {children}
        </ComparePokemonContext.Provider>
    );
};

