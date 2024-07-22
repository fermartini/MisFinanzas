import React, { useState } from 'react';

const Toggle = ({checked, onChange}) => {

    

    return (
        <label className=" items-center cursor-pointer grid grid-cols-3 mt-5 justify-between ">
            <span className="ms-3 mx-2 col-span-1  font-medium text-gray-900 dark:text-gray-300" style={{ fontSize: !checked ? '2rem' : '1rem',color: !checked ? '#8678f9' : 'gray'}}>
                Gastos
            </span>
            <input
                type="checkbox"
                className="sr-only peer"
                checked={checked}
                onChange={onChange}
            />
            <div
                className={`relative w-11 h-6 bg-gray-200 rounded-full peer col-span-1     dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600   `}
                
            />
            <span className=' col-span-1   font-medium text-gray-900 dark:text-gray-300' style={{ fontSize: checked ? '2rem' : '1rem', color: checked ? '#8678f9' : 'gray' }}>
                Ingresos
            </span>
        </label>
    );
};




export default Toggle;