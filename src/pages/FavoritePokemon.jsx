import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext ';
import PokemonCards from '../components/PokemonCards';
import { motion } from 'framer-motion'

const FavoritePokemon = () => {
    const { favorites } = useContext(FavoritesContext);
    return (
        <div>
            <Navbar />
            <Link to='/'>
                <div className='max-w-[2000px] mx-auto my-5'>
                    <button className='bg-blue-500 px-5 py-1 text-white rounded ml-20'>Back</button>
                </div>
            </Link>
            <div className='max-w-[2000px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:px-45 px-5 w-full mt-10'>
                {favorites.map((e, i) => (
                    <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: i * 0.01, ease: "easeOut" }} viewport={{ once: true }} key={e.name}>

                        <PokemonCards key={e.name} img={e.sprites?.other?.dream_world?.front_default || e.sprites?.front_default} name={e.name} id={e.id} />
                    </motion.div>
                ))}
            </div>

        </div>
    )
}

export default FavoritePokemon
