import React from 'react'
import { Link } from 'react-router-dom'

export default function Page404() {
    return (
        <section className="min-h-screen">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-yellow-200">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold  md:text-4xl text-white">PAGINA INEXISTENTE.</p>
                    <p className="mb-4 text-lg font-light  text-gray-400">Perdon, pero no podemos acceder a la pagina. </p>
                    <div className='flex justify-center'> 
                        <Link to='/' className='bg-gray-700 w-fit  text-white text-2xl h-20 lg:w-32  my-10  lg:m-10 hover:text-red-500  rounded-xl justify-center items-center flex p-1 shadow-sm shadow-white  active:translate-y-1 transition-all duration-75'> VOLVER </Link>

                    </div>
                </div>
            </div>
        </section>
    )
}
