import React from 'react'

const PokemonCards = ({ img, name, id, types }) => {
    return (
        <div className='flex flex-col border-1 shadow-sm rounded-sm justify-center items-center p-3'>
            <img className='w-[100px]' src={img} alt={name} />
            <h2 className='font-semibold text-[18px]'>{name}</h2>
            <p>ID: {id}</p>
            <div className='flex gap-2 mt-2'>
                {types?.map((t, index) => (
                    <p
                        key={index}
                        className='bg-[#e5e7eb] px-3 py-1 rounded-2xl  text-sm '>{t}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default PokemonCards
