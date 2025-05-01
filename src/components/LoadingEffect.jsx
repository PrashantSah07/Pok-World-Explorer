import React from 'react'

const LoadingEffect = ({ loopCount }) => {
    let box = new Array(loopCount).fill(undefined);
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[2000px] mx-auto w-full xl:px-45 px-5'>
            {box.map(function (e, i) {
                return <div key={i} className='border-1 md:h-55 h-50 bg-[#a19a9a2d] rounded-sm animate-pulse'></div>
            })}
        </div>
    )
}

export default LoadingEffect
