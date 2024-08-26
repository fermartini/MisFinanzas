import React from 'react'
import GoogleBoton from '../botones/GoogleBoton'
import { useAuth } from '../../context/authContext'
import Loading from '../page/Loading'
import { Link } from 'react-router-dom'
import FlechaVolver from '../iconos/FlechaVolver'


export default function Sesion() {
  const { loading, authloading, user } = useAuth()
  

  if (!user)
    return (
      <>
        <div className='mx-10 relative'>
        <Link to="/" className='bg-gray-700 w-fit absolute top-0 left-0 text-white text-2xl h-20 lg:w-32  my-10  lg:m-10 hover:text-red-500  rounded-xl justify-center items-center flex p-1 shadow-sm shadow-white  active:translate-y-1 transition-all duration-75'>
        <FlechaVolver style='w-10 m-5'/>
        </Link>
        </div>
        
      <form className='h-screen flex justify-center items-center flex-col '>
        
        <div className='mb-5 flex justify-center px-7'>
          <span className='bg-gradient-to-t from-[#c7d2fe] to-[#8678f9] bg-clip-text text-2xl  text-transparent'>
            Inicia Sesion / Registrate con:
          </span>
        </div>
        <div className='bg-blue-950  rounded-xl justify-center items-center flex p-1 shadow-sm shadow-white hover:bg-blue-900 active:bg-blue-950 active:translate-y-1 transition-all duration-75'>
          <GoogleBoton />
        </div>
        
        
      </form>
      
      </>)
      if(!loading || !authloading) return (
        <div className='h-screen w-screen flex flex-col justify-center items-center text-yellow-100 text-5xl'><Loading/> </div>)
}
