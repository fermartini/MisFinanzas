import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import Loading from './Loading';
import { numeroConSeparacion } from '../funciones';
import HomeSinLog from './HomeSinLog';
import Select from '../form/Select.jsx'

export default function Home() {
  const { user, gastos, ingresos, loading, authloading } = useAuth();
  const [totalGastos, setTotalGastos] = useState(0)
  const [totalIngresos, setTotalIngresos] = useState(0)
  const [totalBalance, setTotalBalance] = useState(0)
  const [mesElegido, setMesElegido] = useState({})
  const [anioElegido, setAnioElegido] = useState({})

  const meses = [];
  const anio = [2024, 2025, 2026]

  for (let i = 0; i < 12; i++) {
    const fecha = new Date(2024, i); // Año arbitrario, 2024 en este caso
    const nombreMes = fecha.toLocaleString('es-ES', { month: 'long' });
    const numeroMes = i + 1; // Sumamos 1 para que enero sea 1 y diciembre sea 12

    meses.push({ label: nombreMes, value: numeroMes });
  }



  const buscarMesPorValue = (value) => {
    const mes = meses.find(m => m.value == value);
    return mes ? mes.label.toUpperCase() : 'Mes no encontrado';
  };


  const cambioMes = (e) => {
    const { name, value } = e.target;
    setMesElegido({
      value: parseInt(value),
      label: buscarMesPorValue(value)

    })
  }

  const cambioAnio = (e) => {
    const { value } = e.target;
    setAnioElegido({
      value: parseInt(value),
      label: parseInt(value)

    })
  }



  useEffect(() => {
    const mes = new Date().toLocaleString('es-ES', { month: 'long' })
    const mesNumero = new Date().getMonth() + 1
    setMesElegido({ value: mesNumero, label: mes.toUpperCase() })
    setAnioElegido({ value: new Date().getFullYear(), label: new Date().getFullYear() })

  }, [])


  useEffect(() => {
    if (gastos) {
      setTotalGastos(gastos.reduce((acc, curr) => {
        // Verifica si el año y el mes coinciden
        if (curr.anio == anioElegido.value && curr.mes == mesElegido.value) {
          return acc + curr.importe;
        }
        return acc;
      }, 0))
    }


    if (ingresos)
      setTotalIngresos(ingresos.reduce((acc, curr) => {
        // Verifica si el año y el mes coinciden
        if (curr.anio == anioElegido.value && curr.mes == mesElegido.value) {
          return acc + curr.importe;
        }
        return acc;
      }, 0))
    setTotalBalance(totalIngresos - totalGastos)

    

  }, [gastos, ingresos, totalIngresos, totalGastos, mesElegido, anioElegido])

  if (!user) {
    return (

      <div className='min-h-screen    text-yellow-100 flex justify-center items-center '>{loading || authloading ? <Loading /> : <HomeSinLog />}</div>)
  } else {
    return (

      <div className='min-h-screen mt-5 lg:mt-0  flex flex-col lg:justify-center items-center text-yellow-100 text-5xl px-5'>
        <div className='grid grid-cols-2 mb-5 text-center gap-10'>
          <Select
            name={mesElegido.label}
            value={mesElegido.value}
            onChange={cambioMes}
            options={meses.map((mes) => ({ value: mes.value, label: mes.label }))}
            label='Mes'
          />
          <Select
            name={anioElegido.value}
            value={anioElegido.value}
            onChange={cambioAnio}
            options={anio.map((anio) => ({ value: anio, label: anio }))}
            label='Año'
          />

        </div>

        <div className="grid mb-8 w-full  border  rounded-lg shadow-sm border-gray-700 dark:border-gray-700 md:mb-12 md:w-auto md:grid-cols-2  bg-gray-800 dark:bg-gray-800">
          <h2 className='md:col-span-2 text-center text-base m-3'> INFORME DE {mesElegido.label} {anioElegido.label} </h2>

          <figure className="flex flex-col items-center justify-center p-8 text-center border-b md:rounded-es-lg md:col-span-2 md:border-b-0  bg-gray-800 border-gray-700">
            <blockquote className="max-w-2xl mx-auto mb-4 lg:mb-8 text-gray-400">
              <h1 className="text-lg font-semibold  text-white">BALANCE</h1>
              {loading || authloading ? <div><Loading /></div> : <p className="my-4 text-3xl" style={{ color: totalBalance > 0 ? 'green' : 'red' }}>$ {numeroConSeparacion(totalBalance)}</p>}
            </blockquote>
          </figure>
          <figure className="flex flex-col items-center justify-center p-8 text-center  border-b  rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e bg-gray-800 border-gray-700">
            <blockquote className="max-w-2xl mx-auto mb-4  lg:mb-8 text-gray-400">
              <h3 className="text-lg font-semibold  text-white">INGRESOS</h3>
              {loading || authloading ? <div><Loading /></div> : <p className="my-4 text-3xl">$ {numeroConSeparacion(totalIngresos)}</p>}
            </blockquote>
          </figure>
          <figure className="flex flex-col items-center justify-center p-8 text-center  border-b  md:rounded-se-lg bg-gray-800 border-gray-700">
            <blockquote className="max-w-2xl mx-auto mb-4 lg:mb-8 text-gray-400">
              <h3 className="text-lg font-semibold  text-white">GASTOS</h3>
              {loading || authloading ? <div><Loading /></div> : <p className="my-4 text-3xl">$ {numeroConSeparacion(totalGastos)}</p>}
            </blockquote>
          </figure>
        </div>



      </div>
    )
  }
}


