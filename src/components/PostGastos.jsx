
import API_URL from '../config.js';

const postGastos = async(gasto, ok = () => {}, fallo = () => {})=>{
    try {
        const response = await fetch(`${API_URL}/api/Gastos`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(gasto),
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Algo salió mal');
          }
          const result = await response.json();
          ok()
        console.log('Gasto guardado correctamente', result);
    } catch (error) {
        console.log(error);
        fallo()
    }
}

export default postGastos;