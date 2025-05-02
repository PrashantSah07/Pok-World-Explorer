import React, { useContext, useState } from 'react'
import { FavoritesContext } from '../context/FavoritesContext '
import { Link } from 'react-router-dom';
import { ComparePokemonContext } from '../context/ComparePokemonContext';

const Navbar = () => {
    const { count } = useContext(FavoritesContext);
    const { isDisabled } = useContext(ComparePokemonContext);
    const [isShow, setIsShow] = useState(true);

    return (
        <>
            <div className='max-w-[2000px] mx-auto flex justify-between items-center bg-[#020526] text-white w-full py-2.5 px-5 sticky top-0 z-10'>
                <h1 className="lg:text-4xl text-3xl font-semibold text-center">PokeDex Explorer</h1>
                <div className='hidden gap-2 md:flex'>
                    <Link to='/compare-pokemon'>
                        <button className={`text-white px-4 py-1 rounded relative ${isDisabled ? 'bg-green-900' : 'bg-green-500'}`} disabled={isDisabled}>
                            Compare Pokemon
                        </button>
                    </Link>
                    <Link to='/favorite-pokemon'>
                        <button className={`bg-blue-600 text-white px-4 py-1 rounded relative `} >
                            Favorite's Pokemon
                            <span className='bg-red-500 absolute -top-2 right-0 px-1.5 flex justify-center items-center text-[14px] rounded-full'>{count}</span>
                        </button>
                    </Link>
                </div>
                <div className={`flex-col ${isShow && 'gap-1'} flex md:hidden`} onClick={function () {
                    setIsShow(!isShow)
                }}>
                    <span className={`border-1 bg-white h-0.5 w-5 ${!isShow && 'rotate-45 absolute'} duration-250`}></span>
                    {isShow && <span className='border-1 bg-white h-0.4 w-5 '></span>}
                    <span className={`border-1 bg-white h-0.5 w-5 ${!isShow && '-rotate-45'} duration-250`}></span>
                </div>

            </div>
            <div className={`bg-[#161e2b] h-[100vh] md:hidden flex flex-col gap-5 justify-center items-center w-[90vw] ${isShow ? 'translate-x-[100%]' : 'translate-x-[0%]'} duration-300 fixed top-0 right-0 z-5`}>
                <Link to='/compare-pokemon'>
                    <button className={`text-white px-5 py-2 rounded relative ${isDisabled ? 'bg-green-900' : 'bg-green-500'}`} disabled={isDisabled} onClick={function () {
                        setIsShow(!isShow);
                    }}>
                        Compare Pokemon
                    </button>
                </Link>
                <Link to='/favorite-pokemon'>
                    <button className={`bg-blue-600 text-white px-5 py-2 rounded relative `} onClick={function () {
                        setIsShow(!isShow);
                    }}>
                        Favorite's Pokemon
                        <span className='bg-red-500 absolute -top-2 right-0 px-1.5 flex justify-center items-center text-[14px] rounded-full'>{count}</span>
                    </button>
                </Link>
            </div>
        </>
    )
}

export default Navbar
