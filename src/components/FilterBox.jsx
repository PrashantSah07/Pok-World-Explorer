import React from 'react';

const FilterBox = ({ filterByType }) => {
    const types = ['All', 'Fire', 'Water', 'Grass', 'Flying', , 'Poison', 'Ground', 'Fighting', 'Electric', 'Bug', 'Normal', 'Poison', 'Rock', 'Steel', 'Ghost', 'Psychic', 'Dragon'];

    function handleChange(e) {
        filterByType(e.target.value);
    }

    return (
        <div className="w-full">
            <select className="border px-5 py-2 rounded font-semibold w-full bg-[#1f2937] text-white" onChange={handleChange}>
                {types.map((type, index) => (
                    <option key={index} className="font-semibold" value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterBox;
