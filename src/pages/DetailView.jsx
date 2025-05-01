import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

    if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
    if (!pokemonData) return <p className="text-center text-red-500 mt-10">Error loading data</p>;
    if (pokemonData.length === 0) return <p className='text-center mt-20 font-bold text-4xl' >Not Available</p>

    return (

        <DetailedCardView
            pokemonData={pokemonData}
            evolutionChain={evolutionChain}
            error={error}
        />
    );
};

export default DetailView;
