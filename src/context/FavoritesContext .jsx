import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    const [count, setCount] = useState(favorites.length);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setCount(favorites.length);
    }, [favorites]);


    const addFavorite = (pokemon) => {
        setFavorites((prev) => [...prev, pokemon]);
        alert('added to favorites')
    };

    const removeFavorite = (pokemon) => {
        setFavorites((prev) => prev.filter((p) => p.id !== pokemon.id));
        alert('removed from favorites')
    };

    const isFavorite = (pokemon) => {
        return favorites.some((p) => p.id === pokemon.id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, count }}>
            {children}
        </FavoritesContext.Provider>
    );
};
