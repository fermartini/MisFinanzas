import React from 'react'
import Textarea from '../form/Textarea'
import { useState, useEffect } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import Fecha from '../form/Fecha'
import FetchGastos from '../FetchGastos'
import postGastos from '../PostGastos'
import FormBoton from '../botones/FormBoton'
import GastosCards from '../cards/GastosCards'
import { format } from 'date-fns'
import Toggle from '../form/Toggle'
import postIngresos from '../PostIngresos'
import eliminarGastos from '../EliminarGastos'
import eliminarIngresos from '../EliminarIngresos'
import Swal from 'sweetalert2';

export default function Add() {
  const id = localStorage.getItem('usuarioId')

  const obtenerFechaActual = () => {
    const ahora = new Date();
    const dia = format(ahora, 'dd');
    const mes = format(ahora, 'MM');
    const anio = format(ahora, 'yyyy');
    return { dia, mes, anio };
  }

  const [formValues, setFormValues] = useState({
    importe: '',
    dia: obtenerFechaActual().dia,
    mes: obtenerFechaActual().mes,
    anio: obtenerFechaActual().anio,
    detalle: '',
    NombreGastoId: 1,
    TipoGastoId: 1,
    UsuarioId: id,
    NombreIngresoId: 1,
    TipoIngresoId: 1
  })



  const initialFormValues = {
    importe: '',
    dia: obtenerFechaActual().dia,
    mes: obtenerFechaActual().mes,
    anio: obtenerFechaActual().anio,
    detalle: '',
    NombreGastoId: 1,
    TipoGastoId: 1,
    UsuarioId: id,
    NombreIngresoId: 1,
    TipoIngresoId: 1
  }

  const [gastos, setGastos] = useState([]);
  const [tipoGastos, setTipoGastos] = useState([])
  const [gastosUsuario, setGastosUsuario] = useState([])
  const [ingresos, setIngresos] = useState([])
  const [tipoIngresos, setTipoIngresos] = useState([])
  const [ingresosUsuario, setIgresosUsuario] = useState([])

  useEffect(() => {
    const getGastos = async () => {
      const datos = await FetchGastos('http://localhost:5042/api/NombreGastos')
      setGastos(datos)

    }
    const getTipoGastos = async () => {
      const datos = await FetchGastos('http://localhost:5042/api/TipoGastos')
      setTipoGastos(datos)
    }
    const getGastosUsuario = async () => {
      const datos = await FetchGastos('http://localhost:5042/api/gastos')
      setGastosUsuario(datos)
    }
    const getIngresos = async () => {
      const datos = await FetchGastos('http://localhost:5042/api/NombreIngresos')
      setIngresos(datos)
    }
    const getTipoIngresos = async () => {
      const datos = await FetchGastos('http://localhost:5042/api/TipoIngresos')
      setTipoIngresos(datos)
    }
    const getGastosIngresos = async () => {
      const datos = await FetchGastos('http://localhost:5042/api/ingresos')
      setIgresosUsuario(datos)
    }

    getGastos();
    getTipoGastos();
    getGastosUsuario();
    getIngresos();
    getTipoIngresos();
    getGastosIngresos();

  }, [])

  const [toggleValue, setToggleValue] = useState(false);


  const handleToggle = () => {
    setToggleValue(!toggleValue);
  };
  const tomarDias = (dia, mes, anio) => {
    setFormValues({
      ...formValues,
      dia: dia,
      mes: mes,
      anio: anio
    }
    )
  }

  const cambioTexto = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,

    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario (recarga de página)
    try {
      if (toggleValue)
        await postIngresos(formValues) // Enviar el nuevo gasto
      else
        await postGastos(formValues); // Enviar el nuevo gasto
      // Si postGastos no devuelve el gasto creado, realiza una nueva solicitud para obtener la lista actualizada de gastos

      const datosActualizados = toggleValue ? await FetchGastos('http://localhost:5042/api/ingresos') : await FetchGastos('http://localhost:5042/api/gastos');
      setGastosUsuario(!toggleValue ? datosActualizados : gastosUsuario); // Actualiza el estado con la lista actualizada
      setIgresosUsuario(toggleValue ? datosActualizados : ingresosUsuario);
      setFormValues(initialFormValues); // Reinicia el formulario
    } catch (error) {
      console.error('Error al enviar el gasto:', error);
    }
  }

  const gastosUsuarioImporteDecimales = gastosUsuario.map(gastoUsuario => {
    return {
      ...gastoUsuario,
      importe: gastoUsuario.importe.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    };
  })

  const gastosConNombres = gastosUsuarioImporteDecimales.map(gastoUsuario => {
    const nombreGasto = gastos.find(gasto => gasto.id === gastoUsuario.nombreGastoId);
    return {
      ...gastoUsuario,
      nombreGasto: nombreGasto ? nombreGasto.nombre : 'Desconocido',
      icono: nombreGasto ? nombreGasto.icono : 'Desconocido',
    };
  });

  const gastosConNombresFiltrado = gastosConNombres.filter(e => e.usuarioId == localStorage.getItem('usuarioId'))


  const ingresosUsuarioImporteDecimales = ingresosUsuario.map(ingresoUsuario => {
    return {
      ...ingresoUsuario,
      importe: ingresoUsuario.importe.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    };
  })
  const ingresosConNombre = ingresosUsuarioImporteDecimales.map(ingresoUsuario => {
    const nombreIngresos = ingresos.find(ingreso => ingreso.id === ingresoUsuario.nombreIngresoId);
    return {
      ...ingresoUsuario,
      nombreIngreso: nombreIngresos ? nombreIngresos.nombre : 'Desconocido',
      icono: nombreIngresos ? nombreIngresos.icono : 'Desconocido'
    };
  });


  const ingresosConNombresFiltrado = ingresosConNombre.filter(e => e.usuarioId == localStorage.getItem('usuarioId'))

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
            await eliminarGastos(e);
            const datosActualizados = await FetchGastos('http://localhost:5042/api/gastos');
            setGastosUsuario(datosActualizados);
          } catch (error) {
            console.error('Error al eliminar el gasto:', error);
          }
        }
      }
      )

  };


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
            await eliminarIngresos(e);
            const datosActualizados = await FetchGastos('http://localhost:5042/api/ingresos');
            setIgresosUsuario(datosActualizados);
          } catch (error) {
            console.error('Error al eliminar el gasto:', error);
          }
        }
      }
      )

  };


  console.log('====================================');
  console.log(gastosConNombresFiltrado);
  console.log('====================================');
  return (
    <div className='grid grid-cols-6 h-screen gap-10 mt-10 w-full justify-center overflow-x-hidden'>
      <div className='col-span-1'></div>
      <div className='flex flex-col justify-end h-fit w-full col-span-1'>

        <h2 className='text-white text-3xl text-center text-nowrap'>Ultimos Gastos</h2>
        {
          gastosConNombresFiltrado.slice(-5).reverse().map((e) => (
            <GastosCards key={e.id} icono={e.icono} gasto={e.nombreGasto} precio={e.importe} eliminar={() => eliminarGasto(e.id)} />

          ))
        }



      </div>
      <div className='col-span-2 flex justify-center'>

        <form action="POST" onSubmit={handleSubmit} >
        <Toggle checked={toggleValue} onChange={handleToggle} />

          {!toggleValue ? (
            <>
              <h2 className='text-3xl text-center text-white pt-5'>AGREGAR GASTO</h2>
              <Select
                name='NombreGastoId'
                value={formValues.NombreGastoId}
                onChange={cambioTexto}
                options={gastos.map(gasto => ({ value: gasto.id, label: gasto.nombre }))}
                label='Gasto'
              />
              <Select
                name='TipoGastoId'
                value={formValues.TipoGastoId}
                onChange={cambioTexto}
                options={tipoGastos.map(tipoGasto => ({ value: tipoGasto.id, label: tipoGasto.nombre }))}
                label='Tipo de gasto'
              />
              <div className='flex justify-between gap-5'>
                <Input
                  name='importe'
                  value={formValues.importe}
                  onChange={cambioTexto}
                />
                <Fecha traerFecha={tomarDias} />
              </div>
              <Textarea name='detalle' value={formValues.detalle} onChange={cambioTexto} placeholder='EJ: 1kg de arroz, 2 paquetes de fideos, etc....' />

            </>
          ) : (
            <>
              <h2 className='text-3xl text-center text-white pt-5'>AGREGAR INGRESO</h2>
              <Select
                name='NombreIngresoId'
                value={formValues.NombreIngresoId}
                onChange={cambioTexto}
                options={ingresos.map(ingreso => ({ value: ingreso.id, label: ingreso.nombre }))}
                label='Ingreso'
              />
              <Select
                name='TipoIngresoId'
                value={formValues.TipoIngresoId}
                onChange={cambioTexto}
                options={tipoIngresos.map(tipoIngreso => ({ value: tipoIngreso.id, label: tipoIngreso.nombre }))}
                label='Tipo de ingreso'
              />
              <div className='flex justify-between gap-5'>
                <Input
                  name='importe'
                  value={formValues.importe}
                  onChange={cambioTexto}
                />
                <Fecha traerFecha={tomarDias} />
              </div>
              <Textarea name='detalle' value={formValues.detalle} onChange={cambioTexto} placeholder='EJ: Cuenta del banco galicia....' />

            </>
          )}
          <FormBoton />
          
        </form>
        
      </div>

        <div className='flex flex-col h-fit w-full col-span-1'>

          <h2 className='text-white text-3xl text-center text-nowrap'>Ultimos Ingresos</h2>
          {
            ingresosConNombresFiltrado.slice(-5).reverse().map((e) => (
              <GastosCards key={e.id} icono={e.icono} gasto={e.nombreIngreso} precio={e.importe} eliminar={() => eliminarIngreso(e.id)} />

            ))
          }
      </div>
      <div className='col-span-1'></div>
    </div>
  )
}
