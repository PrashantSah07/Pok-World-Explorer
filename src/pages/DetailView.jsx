import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useFetch from '../Hooks/useFetch';
import DetailedCardView from '../components/DetailedCardView'

const DetailView = () => {
    const { id } = useParams();
    const [pokemonData, loading] = useFetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const [evolutionChain, setEvolutionChain] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchEvolution() {
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
                setEvolutionChain(chain);
            } catch (err) {
                setError('Failed to load evolution chain');
            }
        }

        fetchEvolution();
    }, [id]);

    if (loading) {
        return <>
            <Navbar />
            <p className="text-center mt-10 text-lg text-white">Loading...</p>
        </>
    }
    if (!pokemonData) {
        return <>
            <Navbar />
            <p className="text-center text-red-500 mt-10">Error loading data</p>
        </>
    }
    if (pokemonData.length === 0) {
        return <>
            <Navbar />
            <p className='text-center mt-20 font-bold text-4xl text-red-500' >Not Available</p>
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
            <DetailedCardView
                pokemonData={pokemonData}
                evolutionChain={evolutionChain}
                error={error}
            /></>
    );
};

export default DetailView;
