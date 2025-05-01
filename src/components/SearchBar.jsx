import React from 'react';

const SearchBar = ({ setSearchQuery }) => {
    return (
        <input
            type="text"
            placeholder="Search Pokémon..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-4 py-2 rounded w-full"
        />
    );
};

export default SearchBar;
