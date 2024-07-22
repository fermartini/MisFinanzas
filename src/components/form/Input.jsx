import React from 'react'

export default function Input({ name, value, onChange }) {
    return (
        <div className='mt-5 w-full'>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Importe</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-white">
                    $
                </div>
                <input type="number" 
                id={name} 
                name={name} 
                onChange={onChange} 
                value={value} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="5000.85"/>
            </div>
        </div>
    )
}




