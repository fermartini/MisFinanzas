const eliminarGastos = async(gasto)=>{
    try {
        const response = await fetch(`http://localhost:5042/api/Gastos/${gasto}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Algo salió mal');
          }
        console.log('Gasto eliminado correctamente', );
    } catch (error) {
        console.log(error);
    }
}

export default eliminarGastos