import React from 'react';

const InfoHome = ({logo, titulo, descripcion}) => {
    return (
        <div className='bg-gray-700 rounded-md hover:scale-105 transition-transform duration-300 py-10 px-5 flex flex-col items-center'>
            <div className='grid'>
            {logo}
            </div>
            
            <h2 className='text-3xl text-white text-center'>{titulo}</h2>
            <p className='text-lg text-gray-400 text-center'>{descripcion}</p>
        </div>
    );
};

export default InfoHome;
