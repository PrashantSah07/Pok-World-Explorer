import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (pokemon) => {
        setFavorites((prev) => [...prev, pokemon]);
    };

    const removeFavorite = (pokemon) => {
        setFavorites((prev) => prev.filter((p) => p.id !== pokemon.id));
    };

    const isFavorite = (pokemon) => {
        return favorites.some((p) => p.id === pokemon.id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
