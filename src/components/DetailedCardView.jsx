import React, { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext '
import { motion } from 'framer-motion'

const DetailedCardView = ({ pokemonData, evolutionChain, error }) => {

    const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

    return (
        <motion.div className="max-w-4xl mx-auto p-6 space-y-8 bg-[#1f2937] rounded-xl shadow-md mt-10 mb-10" initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} viewport={{ once: true }}>
            <h1 className="text-5xl font-bold capitalize text-center bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">{pokemonData.name}</h1>

            <div className="flex justify-center">
                <img
                    src={pokemonData.sprites?.other?.dream_world?.front_default || pokemonData.sprites?.front_default}
                    alt={pokemonData.name}
                    className="w-52 h-52 object-contain drop-shadow-xl"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#2d3949] p-4 rounded-lg shadow text-white">
                    <h2 className="text-2xl font-semibold mb-3">Stats</h2>
                    <ul className="space-y-2">
                        {pokemonData.stats?.map(stat => (
                            <li key={stat.stat.name} className="flex justify-between">
                                <span className="capitalize">{stat.stat.name}</span>
                                <span className="font-semibold">{stat.base_stat}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-[#2d3949] p-4 rounded-lg shadow text-white">
                    <h2 className="text-2xl font-semibold mb-3">Abilities</h2>
                    <div className="flex flex-wrap gap-2">
                        {pokemonData.abilities?.map(ability => (
                            <span
                                key={ability.ability.name}
                                className="bg-green-300 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                            >
                                {ability.ability.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-[#2d3949] p-4 rounded-lg shadow text-white">
                <h2 className="text-2xl font-semibold mb-3">Types</h2>
                <div className="flex flex-wrap gap-2">
                    {pokemonData.types?.map(type => (
                        <span
                            key={type.type.name}
                            className="bg-purple-300 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                            {type.type.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="bg-[#2d3949] p-4 rounded-lg shadow text-white">
                <h2 className="text-2xl font-semibold mb-3">Moves (first 20)</h2>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                    {pokemonData.moves?.slice(0, 20).map(move => (
                        <span
                            key={move.move.name}
                            className="bg-blue-300 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                            {move.move.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="bg-[#2d3949] p-4 rounded-lg shadow text-white">
                <h2 className="text-2xl font-semibold mb-3">Evolution Chain</h2>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <p className="text-lg capitalize text-gray-400">{evolutionChain.join(' → ')}</p>
                )}
            </div>

            <div className="flex justify-center">
                {isFavorite(pokemonData) ? (
                    <button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
                        onClick={() => removeFavorite(pokemonData)}>Remove from Favorites</button>) : (
                    <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
                        onClick={() => addFavorite(pokemonData)}>Add to Favorites</button>
                )}
            </div>

        </motion.div>
    )
}

export default DetailedCardView
