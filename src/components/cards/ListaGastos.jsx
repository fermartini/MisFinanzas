import React from 'react'
import { useAuth } from '../../context/authContext';
import ListaGastosUno from './ListaGastosUno.jsx';
import eliminarGastos from '../EliminarGastos.jsx';
import eliminarIngresos from '../EliminarIngresos.jsx';
import { numeroConSeparacion,  eliminarOk, eliminarError } from '../funciones';
import { ToastContainer, toast } from 'react-toastify';

import Swal from 'sweetalert2';
import FetchGastos from '../FetchGastos'
import API_URL from '../../config.js';


export default function ListaGastos({ gastoId = '', gastoNombre, ingresoId='' }) {
    const { gastos, ingresos, setGastos, setIngresos, nombreGastos, nombreIngresos, loading, authloading, user } = useAuth();
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
        <div class="w-full  p-4 bg-white border border-gray-200 rounded-lg text-sm shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 my-5">
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
            <div class="flex items-center justify-center mb-4">
                <h5 class="text-xl font-bold text-center text-nowrap leading-none text-gray-900 dark:text-white">{loading || authloading? 'cargando...' : gastoNombre}</h5>
            </div>
            
           {gastos.map((gasto) => (gastoId == gasto.nombreGastoId? (<ListaGastosUno detalle={gasto.detalle? gasto.detalle : 'sin detalle'} importe={numeroConSeparacion(gasto.importe)} eliminar = {()=> eliminarGasto(gasto.id)} />): null))}
           {ingresos.map((ingreso) => (ingresoId == ingreso.nombreIngresoId? (<ListaGastosUno detalle={ingreso.detalle? ingreso.detalle : 'sin detalle'} importe={numeroConSeparacion(ingreso.importe)} eliminar = {()=> eliminarIngreso(ingreso.id)}/>): null))}
        </div>

    )
}
