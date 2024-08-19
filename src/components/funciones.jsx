import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const numeroConSeparacion = (importe) => {
  return importe.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const notifyOk = () => toast.success('Se agregó correctamente', {
  position: "top-right",
  autoClose: 500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
});

const eliminarOk = () => toast.success('Se eliminó correctamente', {
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

// Exportación nombrada
export { numeroConSeparacion, notifyOk, notifyError, eliminarOk, eliminarError };
