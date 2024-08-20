import React from 'react'
import GoogleBoton from '../botones/GoogleBoton'
import { useAuth } from '../../context/authContext'
import Loading from '../page/Loading'


export default function Sesion() {
  const { loading, authloading, user } = useAuth()
  

  if (!user)
    return (
      <form className='h-screen flex justify-center items-center flex-col'>
        <div className='mb-5 flex justify-center px-7'>
          <span className='bg-gradient-to-t from-[#c7d2fe] to-[#8678f9] bg-clip-text text-2xl  text-transparent'>
            Inicia Sesion / Registrate con:
          </span>
        </div>
        <div className='bg-blue-950  rounded-xl justify-center items-center flex p-1 shadow-sm shadow-white hover:bg-blue-900 dark:active:bg-blue-950 dark:active:translate-y-1 dark:transition-all dark:duration-75'>
          <GoogleBoton />
        </div>
      </form>)
      if(!loading || !authloading) return (
        <div className='h-screen w-screen flex flex-col justify-center items-center text-yellow-100 text-5xl'><Loading/> </div>)
}
