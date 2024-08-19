import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import numeroConSeparacion from '../funciones.jsx'
import Loading from './Loading';
import ListaGastos from '../cards/ListaGastos.jsx';

export default function Resumen() {
    const { gastos, setGastos,ingresos, setIngresos, nombreGastos,nombreIngresos, loading, authloading } = useAuth();
    const [gastosConNombre, setGastosConNombre] = useState([])
    const [ingresosConNombre, setIngresosConNombre] = useState([])

    useEffect(() => {
        gastos ? setGastos(gastos) : setGastos([])
        ingresos ? setIngresos(ingresos) : setIngresos([])


        if (gastos) {
            const gastosActualizados = Array.from(new Set(gastos.map(gasto => gasto.nombreGastoId)))
            .map(id => {
                const nombreGasto = nombreGastos.find(n => n.id === id);
                return {
                    id: nombreGasto.id,
                    nombreGasto: nombreGasto.nombre
                };
            });
            
            setGastosConNombre(gastosActualizados);
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
            
            
            setIngresosConNombre(ingresosActualizados);
        }

    }, [gastos])



    return (
        <div className='min-h-screen w-screen flex flex-col items-center text-yellow-100 text-5xl my-20'>
            <div>
                <h2 className='text-gray-300' >RESUMEN</h2>
            </div>

            <div className='flex flex-col xl:flex-row gap-10'>
                <div>
                    <h2 className='text-3xl text-center '>Gastos</h2>
                    {loading || authloading ? <Loading /> : (gastosConNombre.map((gasto) => (
                        <ListaGastos gastoId={gasto.id} gastoNombre={loading ? 'cargando...' : gasto.nombreGasto} />
                    ))
                    )}
                </div>

                <div>
                    <h2 className='text-3xl text-center '>Ingresos</h2>
                    {loading || authloading ? <Loading /> : (ingresosConNombre.map((ingreso) => (
                        <ListaGastos ingresoId={ingreso.id} gastoNombre={loading ? 'cargando...' : ingreso.nombreIngreso} />
                    ))
                    )}
                </div>
            </div>



        </div>
    );
}    