import React from 'react'
import GoogleBoton from '../botones/GoogleBoton'



export default function sesion() {
    
  return (
    <form className='h-screen flex justify-center items-center flex-col'>
      <div className='mb-5 flex justify-center px-7'>
      <span className='bg-gradient-to-t from-[#c7d2fe] to-[#8678f9] bg-clip-text text-2xl  text-transparent'>
      Inicia Sesion / Registrate con:
    </span>
    </div>
      <GoogleBoton/>
      
    </form>
  )
}
