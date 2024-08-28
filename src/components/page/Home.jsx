import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useAuth } from '../../context/authContext'
import Loading from './Loading';
import { numeroConSeparacion } from '../funciones';
import HomeSinLog from './HomeSinLog';
import Sesion from './Sesion.jsx';

export default function Home() {
  const { user, gastos, ingresos, loading, authloading } = useAuth();
  const [totalGastos, setTotalGastos] = useState(0)
  const [totalIngresos, setTotalIngresos] = useState(0)
  const [totalBalance, setTotalBalance] = useState(0)
  const [mesEnCurso, setMesEnCurso] = useState()
  
  const obtenerFechaActual = () => {
    const ahora = new Date();
    const dia = format(ahora, 'dd');
    const mes = format(ahora, 'MM');
    const anio = format(ahora, 'yyyy');
    return { dia, mes, anio };
  }
  const [mesElegido, setMesElegido] = useState(obtenerFechaActual().mes)

 


  useEffect(() => {
    const mes = new Date().toLocaleString('es-ES', { month: 'long' })
    setMesEnCurso(mes.toUpperCase())
  }, [])


  useEffect(() => {
    if (gastos && ingresos)
      setTotalGastos(gastos.reduce((acc, curr) => acc + (curr.mes === mesElegido ? curr.importe : 0), 0))
    
    if (ingresos)
      setTotalIngresos(ingresos.reduce((acc, curr) => acc + (curr.mes === mesElegido ? curr.importe : 0), 0))
    setTotalBalance(totalIngresos - totalGastos)
    
  }, [gastos, ingresos, totalIngresos, totalGastos, mesElegido])

  if (!user) {
    return (
      
      <div className='min-h-screen    text-yellow-100 flex justify-center items-center '>{loading || authloading? <Loading/> : <HomeSinLog/>  }</div>)
  }
  
  return (
    
    <div className='min-h-screen  flex flex-col justify-center items-center text-yellow-100 text-5xl px-5'>
      <div className="grid mb-8 w-full  border  rounded-lg shadow-sm border-gray-700 md:mb-12 md:w-auto md:grid-cols-2  bg-gray-800">
        <h2 className='md:col-span-2 text-center text-base m-3'> INFORME DE {mesEnCurso} </h2>

        <figure className="flex flex-col items-center justify-center p-8 text-center border-b md:rounded-es-lg md:col-span-2 md:border-b-0  bg-gray-800 border-gray-700">
          <blockquote className="max-w-2xl mx-auto mb-4 lg:mb-8 text-gray-400">
            <h3 className="text-lg font-semibold  text-white">BALANCE</h3>
            {loading || authloading ? <div><Loading/></div> : <p className="my-4 text-3xl" style={{ color: totalBalance > 0 ? 'green' : 'red' }}>$ {numeroConSeparacion(totalBalance)}</p>}
          </blockquote>
        </figure>
        <figure className="flex flex-col items-center justify-center p-8 text-center  border-b  rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e bg-gray-800 border-gray-700">
          <blockquote className="max-w-2xl mx-auto mb-4  lg:mb-8 text-gray-400">
            <h3 className="text-lg font-semibold  text-white">INGRESOS</h3>
            {loading || authloading ? <div><Loading/></div> : <p className="my-4 text-3xl">$ {numeroConSeparacion(totalIngresos)}</p>}
          </blockquote>
        </figure>
        <figure className="flex flex-col items-center justify-center p-8 text-center  border-b  md:rounded-se-lg bg-gray-800 border-gray-700">
          <blockquote className="max-w-2xl mx-auto mb-4 lg:mb-8 text-gray-400">
            <h3 className="text-lg font-semibold  text-white">GASTOS</h3>
            {loading || authloading ? <div><Loading/></div> : <p className="my-4 text-3xl">$ {numeroConSeparacion(totalGastos)}</p>}
          </blockquote>
        </figure>
      </div>



    </div>
  )
}
