import React from 'react';

const SearchBar = ({ setSearchQuery, setSearchId }) => {
    return (
        <>
            <input
                type="text"
                placeholder='Search Pokémon by id...'
                onChange={(e) => setSearchId(e.target.value)}
                className="border px-4 py-2 rounded w-full bg-[#1f2937] text-white" />

            <input
                type="text"
                placeholder="Search Pokémon by name..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border px-4 py-2 rounded w-full bg-[#1f2937] text-white"
            />

        </>
    );
};

export default SearchBar;
