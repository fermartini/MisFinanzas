import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext';
import ListaGastosUno from './ListaGastosUno.jsx';
import eliminarGastos from '../EliminarGastos.jsx';
import eliminarIngresos from '../EliminarIngresos.jsx';
import { numeroConSeparacion,  eliminarOk, eliminarError } from '../funciones';
import { ToastContainer, toast } from 'react-toastify';

import Swal from 'sweetalert2';
import FetchGastos from '../FetchGastos'
import API_URL from '../../config.js';


export default function ListaGastos({ gastoId = '', gastoNombre, ingresoId='', importe = 0, icono = '', mes, anio }) {
    const { gastos, ingresos, setGastos, setIngresos, nombreGastos, nombreIngresos, loading, authloading, user } = useAuth();
    const [gastoFiltrado, setGastoFiltrado] = useState([])
    const [ingresoFiltrado, setIngresoFiltrado] = useState([])
    useEffect(() => {
      if (gastos) {
          setGastoFiltrado(gastos.filter(gasto => gasto.mes == mes.value && gasto.anio == anio.value))

      }
      

  }, [mes, anio, gastos])
  useEffect(() => {
      if (ingresos) {
          setIngresoFiltrado(ingresos.filter(ingreso => ingreso.mes == mes.value && ingreso.anio == anio.value))
      }

      
      
  }, [mes, anio, ingresos])
    const eliminarIngreso = async (e) => {
        Swal.fire(
          {
            title: 'Estas eliminando el ingreso',
            text: '¿Estas seguro?',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar',
            customClass: {
              confirmButton: 'bg-red-500 text-white px-4 py-2 mx-3 rounded',
              cancelButton: 'bg-gray-300 text-black px-4 py-2 mx-3 rounded',
    
            },
            buttonsStyling: false,
    
          }
        ).
          then(async (result) => {
            if (result.isConfirmed) {
              try {
                await eliminarIngresos(e, eliminarOk, eliminarError);
                const datosActualizados = await FetchGastos(`${API_URL}/api/ingresos/usuario/${user.id}`);
                const ingresosConNombreYIcono = datosActualizados.map((ingreso) => {
                  const nombreIngresoEncontrado = nombreIngresos.find(n => n.id === ingreso.nombreIngresoId);
                  return {
                    ...ingreso,
                    nombreIngreso: nombreIngresoEncontrado ? nombreIngresoEncontrado.nombre : 'Nombre no encontrado',
                    icono: nombreIngresoEncontrado ? nombreIngresoEncontrado.icono : '',
                  };
                });
    
                // Actualiza el estado con los datos actualizados
                setIngresos(ingresosConNombreYIcono);
              } catch (error) {
                console.error('Error al eliminar el gasto:', error);
              }
            }
          }
          )
    
      };
      const eliminarGasto = async (e) => {
        Swal.fire(
          {
            title: 'Estas eliminando el gasto',
            text: '¿Estas seguro?',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar',
            customClass: {
              confirmButton: 'bg-red-500 text-white px-4 py-2 mx-3 rounded',
              cancelButton: 'bg-gray-300 text-black px-4 py-2 mx-3 rounded',
    
            },
            buttonsStyling: false,
    
          }
        ).
          then(async (result) => {
            if (result.isConfirmed) {
              try {
                await eliminarGastos(e, eliminarOk, eliminarError);
                const datosActualizados = await FetchGastos(`${API_URL}/api/gastos/usuario/${user.id}`);
                // Añade los nombres e iconos de los gastos actualizados
                const gastosConNombreYIcono = datosActualizados.map((gasto) => {
                  const nombreGastoEncontrado = nombreGastos.find(n => n.id === gasto.nombreGastoId);
                  return {
                    ...gasto,
                    nombreGasto: nombreGastoEncontrado ? nombreGastoEncontrado.nombre : 'Nombre no encontrado',
                    icono: nombreGastoEncontrado ? nombreGastoEncontrado.icono : '',
                  };
                });
    
                // Actualiza el estado con los datos actualizados
                setGastos(gastosConNombreYIcono);
              } catch (error) {
                console.error('Error al eliminar el gasto:', error);
              }
            }
          }
          )
    
      };

    return (
        <div className="w-full  p-4 border  rounded-lg text-sm shadow sm:p-8 bg-gray-800 border-gray-700 my-5 ">
            <ToastContainer position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
            <div className="grid grid-cols-4  items-center justify-between mb-4 ">
                <img src={icono} alt="" className='w-10' />
                <h5 className="text-xl font-bold text-start text-nowrap leading-none ">{loading || authloading? 'cargando...' : gastoNombre}</h5>
                <span className='lg:text-xl text-gray-400 text-end text-xs col-span-2'>$ {numeroConSeparacion(importe)}</span>
            </div>
            
           {[...gastoFiltrado].reverse().map((gasto) => (gastoId == gasto.nombreGastoId? (<ListaGastosUno key={gasto.id} detalle={gasto.detalle? gasto.detalle : 'sin detalle'} importe={numeroConSeparacion(gasto.importe)} eliminar = {()=> eliminarGasto(gasto.id)} dia={gasto.dia} mes={gasto.mes} anio={gasto.anio}/>): null))}
           {[...ingresoFiltrado].reverse().map((ingreso) => (ingresoId == ingreso.nombreIngresoId? (<ListaGastosUno key={ingreso.id} detalle={ingreso.nombreIngreso } importe={numeroConSeparacion(ingreso.importe)} eliminar = {()=> eliminarIngreso(ingreso.id)} dia={ingreso.dia} mes={ingreso.mes} anio={ingreso.anio}/>): null))}
        </div>

    )
}
