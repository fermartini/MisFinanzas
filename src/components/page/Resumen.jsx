import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import Loading from './Loading';
import ListaGastos from '../cards/ListaGastos.jsx';
import Sesion from './Sesion.jsx';

export default function Resumen() {
    const {gastos, setGastos,ingresos, setIngresos, nombreGastos,nombreIngresos, loading, authloading, user} = useAuth();
    const [gastosConNombre, setGastosConNombre] = useState([])
    const [ingresosConNombre, setIngresosConNombre] = useState([])

useEffect(() => {
    
}, [])

    useEffect(() => {
        gastos ? setGastos(gastos) : setGastos([])
        ingresos ? setIngresos(ingresos) : setIngresos([])
        if (gastos) {
            const gastosActualizados = Array.from(new Set(gastos.map(gasto => gasto.nombreGastoId)))
            .map(id => {
                const nombreGasto = nombreGastos.find(n => n.id === id);  
                
                const total = gastos.reduce((acc, curr) => acc + (curr.nombreGastoId === id ? curr.importe : 0), 0)
                return {
                    id: nombreGasto.id,
                    nombreGasto: nombreGasto.nombre,
                    icono: nombreGasto.icono,
                    importe: total
                };
            });
            setGastosConNombre(gastosActualizados);
        }
        if(ingresos){
            const ingresosActualizados = Array.from(new Set(ingresos.map(ingreso =>ingreso.nombreIngresoId)))
            .map(id =>  {
                const nombreIngreso = nombreIngresos.find(n => n.id === id);  
                const total = ingresos.reduce((acc, curr) => acc + (curr.nombreIngresoId === id ? curr.importe : 0), 0)              
                return {
                    id: nombreIngreso.id,
                    nombreIngreso: nombreIngreso.nombre,
                    icono: nombreIngreso.icono,
                    importe: total
                };
            });
            setIngresosConNombre(ingresosActualizados);
        }
        if(loading || authloading){
            console.log(gastosConNombre);
        }
        
    }, [gastos, ingresos])
    if (!user) {
        if(loading || authloading){
            return (
                <div className='min-h-screen  flex flex-col items-center text-yellow-100 text-5xl my-10 px-5'>
                    <div>
                        <h2 className='text-gray-300 text-center' >DETALLES</h2>
                    </div>
                    <div className='flex flex-col xl:grid xl:grid-cols-2  gap-10 my-10'>
                        <div>
                            <h2 className='text-3xl text-center text-red-500 '>GASTOS</h2>
                             <div><Loading /></div> 
                        </div>
                        <div>
                            <h2 className='text-3xl text-center text-green-600 '>INGRESOS</h2> <div><Loading /></div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
          <div className='h-screen w-screen flex flex-col justify-center items-center text-yellow-100 text-5xl'>{loading? <Loading/> : <Sesion/> }</div>)
      }
    return (
        <div className='min-h-screen  flex flex-col items-center text-yellow-100 text-5xl my-10 px-5'>
            <div>
                <h2 className='text-gray-300 text-center' >DETALLES</h2>
            </div>
            <div className='flex flex-col xl:grid xl:grid-cols-2  gap-10 my-10'>
                <div>
                    <h2 className='text-3xl text-center text-red-500 '>GASTOS</h2>
                    {loading || authloading ? <div><Loading /></div>  : (gastosConNombre.map((gasto) => (
                        <ListaGastos icono={gasto.icono} key={gasto.id} importe={gasto.importe}  gastoId={gasto.id} gastoNombre={gasto.nombreGasto}  />
                    ))
                    )}
                </div>
                <div>
                    <h2 className='text-3xl text-center text-green-600 '>INGRESOS</h2>
                    {loading || authloading ? <div><Loading /></div>  : (ingresosConNombre.map((ingreso) => (
                        <ListaGastos icono={ingreso.icono} key={ingreso.id} importe={ingreso.importe} ingresoId={ingreso.id} gastoNombre={ ingreso.nombreIngreso} />
                    ))
                    )}
                </div>
            </div>
        </div>
    );
}    