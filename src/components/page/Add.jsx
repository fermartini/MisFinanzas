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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/authContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './add.css'; // Importa tus estilos CSS para las animaciones
import API_URL from '../../config.js';

export default function Add() {
  const { user, gastos, ingresos, setGastos, setIngresos, tipoGastos, tipoIngresos, nombreGastos, nombreIngresos } = useAuth();
  const [idUser, setIdUser] = useState()
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
    UsuarioId: null, // Inicialmente null
    NombreIngresoId: 1,
    TipoIngresoId: 1
  });
  useEffect(() => {
    gastos.map((e) => {
      const ingresoEncontrado = nombreGastos.find(nombreGastos => nombreGastos.id === e.nombreGastoId);
      const icono = ingresoEncontrado.icono !== '' ? ingresoEncontrado.icono : '../../public/img/gastos.png';
      const nombreIngre = ingresoEncontrado ? ingresoEncontrado.nombre : 'Sin nombre';
  
      console.log(icono);
      console.log(icono.length);
      console.log(typeof icono);
    })
    user ? setIdUser(user.id) : setIdUser(0)


  }, []);
  useEffect(() => {
    const fetchUserId = async () => {
      if (user) {
        try {
          setIdUser(user.id); // Suponiendo que `user.id` es el ID real
          setFormValues(prevFormValues => ({
            ...prevFormValues,
            UsuarioId: user.id // Actualiza el UsuarioId del formulario
          }));
        } catch (error) {
          console.error('Error al obtener el ID del usuario:', error);
        }
      }
    };

    fetchUserId();
  }, [user]);
  const initialFormValues = {
    importe: '',
    dia: obtenerFechaActual().dia,
    mes: obtenerFechaActual().mes,
    anio: obtenerFechaActual().anio,
    detalle: '',
    NombreGastoId: 1,
    TipoGastoId: 1,
    UsuarioId: idUser,
    NombreIngresoId: 1,
    TipoIngresoId: 1
  }
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
      if (toggleValue) {
        await postIngresos(formValues, notifyOk, notifyError) // Enviar el nuevo gasto
      }
      else {
        await postGastos(formValues, notifyOk, notifyError); // Enviar el nuevo gasto
      }
      // Si postGastos no devuelve el gasto creado, realiza una nueva solicitud para obtener la lista actualizada de gastos
      const datosActualizados = toggleValue ? await FetchGastos(`${API_URL}/api/ingresos/usuario/${idUser}`) : await FetchGastos(`${API_URL}/api/gastos/usuario/${idUser}`);
      setGastos(!toggleValue ? datosActualizados : gastos); // Actualiza el estado con la lista actualizada
      setIngresos(toggleValue ? datosActualizados : ingresos);
      setFormValues(initialFormValues); // Reinicia el formulario
    } catch (error) {
      console.error('Error al enviar el gasto:', error);

    }
  }
  const numerosConSeparacion = (importe) => {
    return importe.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
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
            const datosActualizados = await FetchGastos(`${API_URL}/api/gastos/usuario/${idUser}`);
            setGastos(datosActualizados);
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
            await eliminarIngresos(e, eliminarOk, eliminarError);
            const datosActualizados = await FetchGastos(`${API_URL}/api/ingresos/usuario/${idUser}`);
            setIngresos(datosActualizados);
          } catch (error) {
            console.error('Error al eliminar el gasto:', error);
          }
        }
      }
      )

  };
  const notifyOk = () => toast.success('Se agrego correctamente', {
    position: "top-right",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const eliminarOk = () => toast.success('Se elimino correctamente', {
    position: "top-right",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const notifyError = () => toast.error('No se pudo agregar, intenta de nuevo', {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  const eliminarError = () => toast.error('No se pudo eliminar, intenta de nuevo', {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });


  
  if (!user) {
    return (
      <div className='h-screen w-screen flex flex-col justify-center items-center text-yellow-100 text-5xl'>INICIA SESION</div>)
  }
  return (
    <div className='lg:grid lg:grid-cols-6 min-h-screen gap-10 lg:mt-10 w-full justify-center overflow-x-hidden'>
      <div className='lg:col-span-1'></div>
      <div className='lg:col-span-2 flex flex-col items-center px-10 lg:p-0'>
        <Toggle checked={toggleValue} onChange={handleToggle} />
        <form action="POST" onSubmit={handleSubmit} className='w-full' >
          {!toggleValue ? (
            <>
              <h2 className='text-3xl text-center text-white pt-5'>AGREGAR GASTO</h2>
              <Select
                name='NombreGastoId'
                value={formValues.NombreGastoId}
                onChange={cambioTexto}
                options={nombreGastos.map(nombreGasto => ({ value: nombreGasto.id, label: nombreGasto.nombre }))}
                label='Gasto'
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
                options={nombreIngresos.map(nombreIngreso => ({ value: nombreIngreso.id, label: nombreIngreso.nombre }))}
                label='Ingreso'
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

        </form>


      </div>
      <div className="flex flex-col lg:flex-row col-span-2 h-screen gap-10 w-full px-10">
        <div className='flex flex-col justify-end h-fit w-full col-span-1 '>

          <h2 className='text-white text-3xl text-center text-nowrap'>Últimos Gastos</h2>
          <TransitionGroup>
            {
              gastos.slice(-5).reverse().map((e) => {
                const gastoEncontrado = nombreGastos.find(nombreIngreso => nombreIngreso.id === e.nombreGastoId);
                const icono = gastoEncontrado.icono !== '' ? gastoEncontrado.icono : '/icono/flecha-gastos.png';
                const nombreGasto = gastoEncontrado.nombre !== '' ? gastoEncontrado.nombre : 'Sin nombre';

                return (
                  <CSSTransition key={e.id} timeout={500} classNames='fade'>
                    <GastosCards
                      key={e.id}
                      icono={icono}
                      gasto={nombreGasto}
                      precio={numerosConSeparacion(e.importe)}
                      eliminar={() => eliminarGasto(e.id)}
                    />
                  </CSSTransition>
                );
              })
            }
          </TransitionGroup>
        </div>
        <div className='flex flex-col h-fit w-full col-span-1'>

          <h2 className='text-white text-3xl text-center text-nowrap'>Ultimos Ingresos</h2>
          <TransitionGroup>
            {
              ingresos.slice(-5).reverse().map((e) => {
                const ingresoEncontrado = nombreIngresos.find(nombreIngreso => nombreIngreso.id === e.nombreIngresoId);
                const icono = ingresoEncontrado.icono !== '' ? ingresoEncontrado.icono : '/icono/flecha-ingresos.png';
                const nombreIngre = ingresoEncontrado ? ingresoEncontrado.nombre : 'Sin nombre';

                return (
                  <CSSTransition key={e.id} timeout={500} classNames='fade'>
                    <GastosCards
                      key={e.id}
                      icono={icono}
                      gasto={nombreIngre}
                      precio={numerosConSeparacion(e.importe)}
                      eliminar={() => eliminarIngreso(e.id)}
                    />
                  </CSSTransition>
                );
              })
            }
          </TransitionGroup>
        </div>
      </div>
      <div className='col-span-1'></div>
    </div>
  )
}
