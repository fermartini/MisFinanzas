import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import Loading from './Loading';
import ListaGastos from '../cards/ListaGastos.jsx';
import Sesion from './Sesion.jsx';
import Select from '../form/Select.jsx';

export default function Resumen() {
    const { gastos, setGastos, ingresos, setIngresos, nombreGastos, nombreIngresos, loading, authloading, user } = useAuth();
    const [gastosConNombre, setGastosConNombre] = useState([])
    const [ingresosConNombre, setIngresosConNombre] = useState([])
    const [gastoFiltrado, setGastoFiltrado] = useState([])
    const [ingresoFiltrado, setIngresoFiltrado] = useState([])

    const meses = [];
    const anio = [2024, 2025, 2026]

    for (let i = 0; i < 12; i++) {
        const fecha = new Date(2024, i); // Año arbitrario, 2024 en este caso
        const nombreMes = fecha.toLocaleString('es-ES', { month: 'long' });
        const numeroMes = i + 1; // Sumamos 1 para que enero sea 1 y diciembre sea 12

        meses.push({ label: nombreMes, value: numeroMes });
    }
    const mes = new Date().toLocaleString('es-ES', { month: 'long' })

    const mesNumero = new Date().getMonth() + 1
    const [mesElegido, setMesElegido] = useState({ value: mesNumero, label: mes.toUpperCase() })
    const [anioElegido, setAnioElegido] = useState({ value: new Date().getFullYear(), label: new Date().getFullYear() })

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
        if (gastos) {
            setGastoFiltrado(gastos.filter(gasto => gasto.mes == mesElegido.value && gasto.anio == anioElegido.value))

        }
        console.log(gastoFiltrado);
        

    }, [mesElegido, anioElegido, gastos])
    useEffect(() => {
        if (ingresos) {
            setIngresoFiltrado(ingresos.filter(ingreso => ingreso.mes == mesElegido.value && ingreso.anio == anioElegido.value))
        }

        
        
    }, [mesElegido, anioElegido, ingresos])


    useEffect(() => {
        if (gastos) {
            const gastosActualizados = Array.from(new Set(gastoFiltrado.map(gasto => gasto.nombreGastoId)))
                .map(id => {
                    const nombreGasto = nombreGastos.find(n => n.id === id);
                    const total = gastoFiltrado.reduce((acc, curr) => acc + (curr.nombreGastoId === id ? curr.importe : 0), 0)
                    return {
                        id: nombreGasto.id,
                        nombreGasto: nombreGasto.nombre,
                        icono: nombreGasto.icono,
                        importe: total
                    };
                });
            setGastosConNombre(gastosActualizados);
        }
        if (ingresos) {
            const ingresosActualizados = Array.from(new Set(ingresoFiltrado.map(ingreso => ingreso.nombreIngresoId)))
                .map(id => {
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
            console.log(gastoFiltrado);
        }

    }, [gastoFiltrado, ingresoFiltrado])

    if (!user) {
        if (loading || authloading) {
            return (
                <section className='min-h-screen max-w-screen  flex flex-col items-center text-yellow-100 text-5xl my-10 px-5'>
                    <div>
                        <h2 className='text-gray-300 text-center' >DETALLES</h2>
                    </div>
                    <div className='grid grid-cols-2 gap-10 mb-2 text-center'>

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
                    <div className='flex flex-col xl:grid xl:grid-cols-2  gap-10 my-10'>
                        <div>
                            <h2 className='text-3xl text-center text-red-500 '>GASTOS</h2>
                            <div><Loading /></div>
                        </div>
                        <div>
                            <h2 className='text-3xl text-center text-green-600 '>INGRESOS</h2> <div><Loading /></div>
                        </div>
                    </div>
                </section>
            );
        }
        return (
            <div className='h-screen w-screen flex flex-col justify-center items-center text-yellow-100 text-5xl'>{loading ? <Loading /> : <Sesion />}</div>)
    }
    return (
        <section className='min-h-screen  flex flex-col items-center text-yellow-100 text-5xl my-10 px-5'>
            <div>
                <h1 className='text-gray-300 text-center' >DETALLES</h1>
            </div>
            <article className='grid grid-cols-2 gap-10 mb-2 text-center'>

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

            </article>
            <article className='flex flex-col xl:grid xl:grid-cols-2  gap-10 my-10'>
                <div>
                    <h2 className='text-3xl text-center text-red-500 '>GASTOS</h2>
                    {loading || authloading ? <div><Loading /></div> : (gastosConNombre.map((gasto) => (
                        <ListaGastos icono={gasto.icono} key={gasto.id} importe={gasto.importe} gastoId={gasto.id} gastoNombre={gasto.nombreGasto} mes={mesElegido} anio={(anioElegido)} />
                    ))
                    )}
                </div>
                <div>
                    <h2 className='text-3xl text-center text-green-600 '>INGRESOS</h2>
                    {loading || authloading ? <div><Loading /></div> : (ingresosConNombre.map((ingreso) => (
                        <ListaGastos icono={ingreso.icono} key={ingreso.id} importe={ingreso.importe} ingresoId={ingreso.id} gastoNombre={ingreso.nombreIngreso} mes={mesElegido} anio={(anioElegido)} />
                    ))
                    )}
                </div>
            </article>
        </section>
    );
}    