import React from 'react'
import Delete from '../form/Delete'

export default function ListaGastosUno({ detalle, importe, eliminar }) {
    return (
        <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 w-full ">
                <li className="py-3 sm:py-4 flex justify-around gap-10">
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {detalle}
                            </p>
                        <span className='text-red-100'>$ {importe}</span>
                            
                        
                        <button onClick={eliminar}><Delete /></button> 
                        
                </li>
            </ul>
        </div>
    )
}
