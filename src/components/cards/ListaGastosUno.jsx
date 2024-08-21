import React from 'react'
import Delete from '../form/Delete'

export default function ListaGastosUno({ detalle, importe, eliminar, dia, mes, anio }) {
    return (
        <div className="flow-root">
            <ul role="list" className="divide-y  divide-gray-700 w-full border-b border-blue-300  ">
                <li className="py-3 sm:py-4 gap-5 grid grid-cols-4 ">
                    <p className="text-xs xl:text-sm truncate text-gray-300 ">{dia}/{mes}/{anio}</p>
                    <p className="text-xs truncate text-gray-400 ">
                        {detalle}
                    </p>
                    
                    <span className='text-gray-200  text-sm text-center text-nowrap'>$ {importe}</span>
                    <button onClick={eliminar} className='flex justify-end'><Delete /></button>

                    

                </li>
            </ul>
        </div>
    )
}
