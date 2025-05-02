import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ComparePokemonContext } from '../context/ComparePokemonContext';
import useFetch from '../Hooks/useFetch';
import DetailedCardView from '../components/DetailedCardView';
import Navbar from '../components/Navbar';

const ComparePokemon = () => {
    const { selected } = useContext(ComparePokemonContext);

    const [data1, loading1, error1] = useFetch(`https://pokeapi.co/api/v2/pokemon/${selected[0]}`);
    const [data2, loading2, error2] = useFetch(`https://pokeapi.co/api/v2/pokemon/${selected[1]}`);

    const [evolution1, setEvolution1] = useState([]);
    const [evolution2, setEvolution2] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchEvolution(id, setEvolution) {
            try {
                const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
                const speciesData = await speciesRes.json();
                const evoUrl = speciesData.evolution_chain.url;

                const evoRes = await fetch(evoUrl);
                const evoData = await evoRes.json();

                const chain = [];
                let current = evoData.chain;

                while (current) {
                    chain.push(current.species.name);
                    current = current.evolves_to[0];
                }

                setEvolution(chain);
            } catch (err) {
                setError('Failed to load evolution chain');
            }
        }

        if (selected.length === 2) {
            fetchEvolution(selected[0], setEvolution1);
            fetchEvolution(selected[1], setEvolution2);
        }
    }, [selected]);

    if (loading1 || loading2) {
        return <>
            <Navbar />
            <p className="text-white text-center mt-10">Loading Pokémon data...</p>
        </>
    }

    if (error1 || error2) {
        return <>
            <Navbar />
            <p className='text-white text-center mt-10'>Please select two Pokémon to compare.</p>
        </>
    }

    return (
        <>
            <Navbar />
            <Link to='/'>
                <div className='max-w-[2000px] mx-auto my-5'>
                    <button className='bg-blue-500 px-5 py-1 text-white rounded ml-20'>Back</button>
                </div>
            </Link>

            <div className='text-white max-w-6xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <DetailedCardView
                    pokemonData={data1}
                    evolutionChain={evolution1}
                    error={error}
                />
                <DetailedCardView
                    pokemonData={data2}
                    evolutionChain={evolution2}
                    error={error}
                />
            </div>
        </>
    );
};

export default ComparePokemon;
