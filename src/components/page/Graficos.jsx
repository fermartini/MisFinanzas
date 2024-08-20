import React, {useEffect, useState} from 'react'
import {useAuth} from '../../context/authContext'
import Loading from '../page/Loading'

export default function Graficos() {
  const {gastos, ingresos, loading , authloading, nombreGastos, nombreIngresos, user} = useAuth()
  const [gastosCategoria, setGastosCategoria] = useState([])
  const [ingresosCategorias, setIngresosCategorias] = useState([])

  useEffect(() => {
    if (gastos && ingresos) {
      if (gastos) {
        const gastosActualizados = Array.from(new Set(gastos.map(gasto => gasto.nombreGastoId)))
        .map(id => {
            const nombreGasto = nombreGastos.find(n => n.id === id);
            return {
                id: nombreGasto.id,
                nombreGasto: nombreGasto.nombre
            };
        });
        setGastosCategoria(gastosActualizados);
    }
    if(ingresos){
      const ingresosActualizados = Array.from(new Set(ingresos.map(ingreso =>ingreso.nombreIngresoId)))
      .map(id =>  {
          const nombreIngreso = nombreIngresos.find(n => n.id === id);
          
          return {
              id: nombreIngreso.id,
              nombreIngreso: nombreIngreso.nombre
          };
      });
      
      
      setIngresosCategorias(ingresosActualizados);
  }

    }
  }, [])
  if (!user) {
    return (
      <div className='h-screen w-screen flex flex-col justify-center items-center text-yellow-100 text-5xl'>{loading? <Loading/> : 'INICIA SESION'}</div>)
  }
  return (
     <div className='h-screen flex justify-center items-center text-yellow-100 text-5xl'>{gastosCategoria.map(gasto => gasto.nombreGasto)}</div>

  )
}
