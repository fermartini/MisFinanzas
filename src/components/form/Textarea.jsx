import React from 'react'

export default function Textarea({name, value, onChange, placeholder, disabled=false}) {
    return (
        <div className='mt-5'>
            <label  htmlFor={name} className="block mb-2 text-sm font-medium  text-white">
                Detalles
            </label>
            <textarea id={name} name={name} value={value} onChange={onChange}rows="4" disabled={disabled} className="block p-2.5 w-full text-sm  rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-950" placeholder={placeholder} />
        </div>
    )
}
