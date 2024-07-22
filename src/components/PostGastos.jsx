
  

const postGastos = async(gasto)=>{
    try {
        const response = await fetch('http://localhost:5042/api/Gastos', {
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
        console.log('Gasto guardado correctamente', result);
    } catch (error) {
        console.log(error);
    }
}

export default postGastos;