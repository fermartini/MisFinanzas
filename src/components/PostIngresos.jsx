
import API_URL from '../config.js';

const postIngresos = async(gasto, ok = () => {}, fallo = () => {})=>{
    try {
        const response = await fetch(`${API_URL}/api/Ingresos`, {
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
      fallo()
        console.log(error);
        
    }
}

export default postIngresos;