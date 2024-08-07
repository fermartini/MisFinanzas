import API_URL from '../config.js';

const eliminarIngresos = async(gasto, ok = () => {}, fallo = () => {})=>{
    try {
        const response = await fetch(`${API_URL}/api/Ingresos/${gasto}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Algo salió mal');
          }
          ok()
        console.log('Gasto eliminado correctamente');
    } catch (error) {
      fallo()
        console.log(error);
    }
}

export default eliminarIngresos