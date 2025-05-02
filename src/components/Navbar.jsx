import React, { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext '
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { count } = useContext(FavoritesContext);
    return (
        <div className='max-w-[2000px] mx-auto flex justify-between items-center bg-[#020526] text-white w-full py-2.5 px-5 sticky top-0 z-10'>
            <span></span>
            <h1 className="text-4xl font-semibold text-center">PokeDex Explorer</h1>
            <Link to='/favorite-pokemon'>
                <button className='bg-blue-600 text-white px-4 py-1 rounded relative' >
                    Favorite's Pokemon
                    <span className='bg-red-500 absolute -top-2 right-0 px-1.5 flex justify-center items-center text-[14px] rounded-full'>{count}</span>
                </button>
            </Link>
        </div>
    )
}

export default Navbar
