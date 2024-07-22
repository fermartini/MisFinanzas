import React from 'react'
import Delete from '../form/Delete'

export default function GastosCards({ icono, gasto, precio, eliminar }) {
    return (
        <>
            <div className='relative h-fit  w-full  overflow-hidden rounded-xl border border-gray-800 p-[1px] backdrop-blur-3xl mt-5'>
                <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                <div className='grid grid-cols-4   gap-5 h-full w-full items-center justify-around rounded-xl bg-gray-950 px-3 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl' >
                    <div className='col-span-1 flex justify-end '>
                        <img src={icono} alt="" className='w-10' />
                    </div>

                    <div className='flex flex-col   col-span-3 gap-3'>
                        <span className='inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-xl text-transparent'>
                            {gasto}
                        </span>
                        <span className='text-nowrap animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-xl text-transparent'>
                            $ {precio}
                        </span>

                    </div>

                </div>
            </div>
            <div className='mt-2 flex justify-end'>
                <button onClick={eliminar}><Delete /></button>

            </div>
        </>
    )
}
