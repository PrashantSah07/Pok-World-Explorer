import React, { useEffect, useState } from 'react';
import useFetch from './Hooks/useFetch';
import PokemonCards from './components/PokemonCards';
import LoadingEffect from './components/LoadingEffect';
import SearchBar from './components/SearchBar';
import FilterBox from './components/FilterBox';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = 150;
  const [selectedType, setSelectedType] = useState('All');
  const [data, loading, error] = useFetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pageCount}&offset=${pageCount * (currentPage - 1)}`
  );
  const [details, setDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    async function fetchDetails() {
      if (data?.results) {
        const responses = await Promise.all(
          data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
        );
        setDetails(responses);
        let filtered = responses;

        if (selectedType !== 'All') {
          filtered = filtered.filter(pokemon =>
            pokemon.types.some(t => t.type.name === selectedType.toLowerCase())
          );
        }

        if (searchQuery.trim() !== '') {
          filtered = filtered.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setDisplayedData(filtered);
      }
    }
    fetchDetails();
  }, [data, selectedType, searchQuery]);


  const filterByType = (type) => {
    setSelectedType(type);
    if (type === 'All') {
      setDisplayedData(details);
    } else {
      const filtered = details.filter(pokemon =>
        pokemon.types.some(t => t.type.name === type.toLowerCase())
      );
      setDisplayedData(filtered);
    }
  };

  const totalPages = data?.count ? Math.ceil(data.count / pageCount) : 0;

  return (
    <div className="p-4 flex flex-col gap-5 my-5">
      <h1 className="text-4xl font-semibold text-center">PokeDex Explorer</h1>

      <div className='flex sm:flex-row flex-col justify-between items-center sm:max-w-[500px] mx-auto w-full px-5 gap-2'>
        <SearchBar setSearchQuery={setSearchQuery} />
        <FilterBox filterByType={filterByType} />
      </div>

      {loading && <LoadingEffect loopCount={20} />}
      {error && <p className="text-center text-red-500">Error: {error.message}</p>}

      <div className="max-w-[2000px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:px-45 px-5 w-full">
        {displayedData.map(pokemon => (
          <PokemonCards
            key={pokemon.name}
            img={pokemon.sprites?.other?.dream_world.front_default || pokemon.sprites?.front_default}
            name={pokemon.name}
            id={pokemon.id}
            types={pokemon.types.map(t => t.type.name)}
          />
        ))}
      </div>

      {!loading && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(prev => prev - 1)}
            disabled={currentPage === 1}
            className={`px-5 py-2 rounded-xl text-white transition-colors ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            Previous
          </button>

          <span className="font-semibold text-lg">Page {currentPage} of {totalPages}</span>

          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === totalPages}
            className={`px-5 py-2 rounded-xl text-white transition-colors ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
