import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado
import InfoHome from '../cards/InfoHome.jsx';
import Dolar from '../iconos/Dolar.jsx';
import Grafico from '../iconos/Grafico.jsx';
import Analisis from '../iconos/Analisis.jsx';
import Lista from '../iconos/Lista.jsx'

const HomeSinLog = () => {
    return (
        <main className='w-screen h-fit py-10 px-5 lg:px-52'>
            <header>
            <nav className='flex justify-between'>
                <Link to='/login' className='text-2xl lg:text-5xl' aria-label='logo mis finanzas'>Mis Finanzas</Link>
                <div className='flex gap-1 lg:gap-5'> 
                    <Link to="/login" className='lg:text-lg text-sm bg-purple-700 rounded-xl p-2 lg:p-5 text-white hover:bg-purple-900 hover:text-red-200 transition-colors text-nowrap flex justify-center items-center' aria-label="Iniciar sesión en Mis Finanzas">Iniciar sesión</Link>
                    <Link to="/login" className='lg:text-lg text-sm bg-purple-700 rounded-xl p-2 lg:p-5 text-white hover:bg-purple-900 hover:text-red-200 transition-colors flex justify-center items-center' aria-label="Registrate sesión en Mis Finanzas">Registrarse</Link>
                </div>
            </nav>
            </header>
           
            <section className='my-20' aria-labelledby="controla-finanzas">
                <div className='flex flex-col gap-3 lg:gap-5 justify-center items-center text-white  '>
                    <div className='flex'>
                        <div className='flex flex-col justify-center'>
                            <h1 id="controla-finanzas" className='lg:text-6xl text-3xl text-center font-bold'>Controla tus finanzas con facilidad.</h1>
                            <h2 className='lg:text-2xl text-sm text-center text-gray-400'>Registra gastos e ingresos, visualiza reportes y toma el control de tu dinero.</h2>
                        </div>
                    </div>


                    <Link to='/login' className='text-lg bg-green-500 rounded-xl p-2 lg:p-5 text-blue-950 font-bold hover:bg-green-950 hover:text-red-200 transition-colors' aria-label="Empezar a gestionar finanzas">Comenzar ahora</Link>
                </div>
            </section>
            <section className='grid lg:grid-cols-3 mt-16 gap-10' aria-labelledby="funcionalidades">
            <h2 id="funcionalidades" className='sr-only'>Funcionalidades de GastApp</h2>
                <InfoHome logo={<Dolar style='text-purple-900 h-12 mt-2' />} titulo='Registro de transacciones' descripcion='Agrega facilmente tus gastos e ingresos.' />
                <InfoHome logo={<Grafico style='text-purple-900 h-16' />} titulo='Graficos intuitivos' descripcion='Visualiza la distribucion de tus gastos e ingresos con graficos claros' />
                <InfoHome logo={<Analisis style='text-purple-900 h-16 flex justify-center' />} titulo='Análisis  de tendencias' descripcion='Observa cómo evolucionan tus finanzas a lo largo del tiempo.' />
                <div className='hidden lg:flex'></div>
                <InfoHome logo={<Lista style='text-purple-900 h-12 mt-2' />} titulo='Listados detallados' descripcion='Accede a listados completos de todas tus transacciones.' />

            </section>
            <section className='text-white pt-10 flex flex-col items-center gap-5' aria-labelledby="cta">
                <h3  className='lg:text-6xl font-bold text-3xl text-center'>¿Listo para tomar el control de tus finanzas?</h3>
                <h2 id="cta" className='lg:text-2xl text-lg text-center'>Únete a miles de usuarios que ya están ahorrando y gestionando mejor su dinero.</h2>
                <Link to='/login' className='text-lg bg-purple-500 rounded-xl p-5 text-blue-950 font-bold hover:bg-purple-900 hover:text-red-200  transition-colors'>Crear cuenta gratis</Link>
            </section>
            <footer className='container mx-auto px-4 py-8 text-center text-gray-400'>
                <p className='text-gray-500 text-center text-sm'>© 2024 GastApp. Todos los derechos reservados.</p>
            </footer>
        </main>

    );
};

export default HomeSinLog;
