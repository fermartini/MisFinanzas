import React from 'react';
import GoogleBoton from '../botones/GoogleBoton';
import { useAuth } from '../../context/authContext';
import Loading from '../page/Loading';
import { Link } from 'react-router-dom';
import FlechaVolver from '../iconos/FlechaVolver';
import { Helmet } from 'react-helmet';

export default function Sesion() {
  const { loading, authloading, user } = useAuth();

  if (!user) {
    return (
      <main>
        <Helmet>
          <title>Inicia Sesión o Regístrate - Mis Finanzas App</title>
          <meta name="description" content="Inicia sesión o regístrate usando Google. Accede a todas las funciones de la aplicación para gestionar tus finanzas de manera eficiente." />
        </Helmet>
        
        <div className='mx-10 relative'>
          <Link 
            to="/" 
            className='bg-gray-700 w-fit absolute top-0 left-0 text-white text-2xl h-20 lg:w-32 my-10 lg:m-10 hover:text-red-500 rounded-xl justify-center items-center flex p-1 shadow-sm shadow-white active:translate-y-1 transition-all duration-75'
            aria-label="Volver a la página principal"
          >
            <FlechaVolver style='w-5 mx-5' />
          </Link>
        </div>

        <div className='h-screen flex justify-center items-center flex-col'>
          <article className='mb-5 flex justify-center px-7'>
            <h1 className='bg-gradient-to-t from-[#c7d2fe] to-[#8678f9] bg-clip-text text-xl text-transparent'>
              Inicia Sesión / Regístrate con:
            </h1>
          </article>
          <div className='bg-blue-950 rounded-xl justify-center items-center flex p-1 shadow-sm shadow-white hover:bg-blue-900 active:bg-blue-950 active:translate-y-1 transition-all duration-75'>
            <GoogleBoton />
          </div>
        </div>
      </main>
    );
  }

  if (!loading || !authloading) {
    return (
      <div className='h-screen w-screen flex flex-col justify-center items-center text-yellow-100 text-5xl'>
        <Loading />
      </div>
    );
  }

  return null;
}
