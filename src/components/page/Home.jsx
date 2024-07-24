import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'

export default function Home() {
  const { user, gastos, ingresos } = useAuth();
  const [num, setNum] = useState(0)
  const [num2, setNum2] = useState(0)
  useEffect (() => {
    if(gastos )
      setNum(gastos.length - 1)
    if(ingresos)
      setNum2(ingresos.length - 1)
  }, [])

  if(!user){
    return (
    <div className='h-screen w-screen flex flex-col justify-center items-center text-yellow-100 text-5xl'>INICIA SESION</div>)
  }
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center text-yellow-100 text-5xl'>
      
      Bienvenido {user?.nombre}, 
    
      
    </div>
  )
}
