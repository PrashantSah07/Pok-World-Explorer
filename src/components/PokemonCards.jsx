import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FavoritesContext } from '../context/FavoritesContext '

const PokemonCards = ({ img, name, id, types }) => {
    const { isFavorite } = useContext(FavoritesContext);

    return (
        <Link to={`/pokemon/${id}`}>
            <div className='flex flex-col shadow-sm rounded-sm justify-center items-center p-3 relative bg-[#1f2937] text-white hover:scale-[1.03] duration-200'>
                <img className='w-[100px] h-[100px]' src={img} alt={name} />
                <h2 className='font-semibold text-[18px]'>{name}</h2>
                <p>ID: {id}</p>
                <div className='flex gap-2 mt-2'>
                    {types?.map((t, index) => (
                        <p
                            key={index}
                            className='bg-[#6694f0] px-3 py-1 rounded-2xl  text-sm '>{t}
                        </p>
                    ))}
                </div>
                {isFavorite({ id }) && (
                    <p className='bg-green-500 text-[12px] text-white rounded-full px-2 py-0.5 absolute top-2 right-2'>Favorites</p>
                )}
            </div>
        </Link>
    )
}

export default PokemonCards
