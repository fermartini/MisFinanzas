import React from 'react'

export default function Select({ name, value, onChange, options = [], label }) {
    return (
        <div className='mt-5'>
            <label htmlFor={name} className="block mb-2 text-sm font-medium  text-white">{label}</label>
            <select id={name} name={name} value={value} onChange={onChange} className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
