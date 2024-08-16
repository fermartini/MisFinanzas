import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useAuth } from '../../context/authContext'

export default function Home() {
  const { user, gastos, ingresos } = useAuth();
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

 
  const numerosConSeparacion = (importe) => {
    return importe.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

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
      <div className='h-screen w-screen flex flex-col justify-center items-center text-yellow-100 text-5xl'>INICIA SESION</div>)
  }
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center text-yellow-100 text-5xl px-5'>



      <div class="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2 bg-white dark:bg-gray-800">
        <h2 className='md:col-span-2 text-center text-base m-3'> INFORME DEL {mesEnCurso} </h2>

        <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-es-lg md:col-span-2 md:border-b-0  dark:bg-gray-800 dark:border-gray-700">
          <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">BALANCE</h3>
            <p class="my-4 text-3xl" style={{ color: totalBalance > 0 ? 'green' : 'red' }}>$ {numerosConSeparacion(totalBalance)}</p>
          </blockquote>
        </figure>
        <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
          <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">INGRESOS</h3>
            <p class="my-4 text-3xl">$ {numerosConSeparacion(totalIngresos)}</p>
          </blockquote>
        </figure>
        <figure class="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700">
          <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">GASTOS</h3>
            <p class="my-4 text-3xl">$ {numerosConSeparacion(totalGastos)}</p>
          </blockquote>
        </figure>
      </div>



    </div>
  )
}
