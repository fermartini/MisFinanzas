const fetchGastos = async (link) => {
    try {
        const response = await fetch(link); // No usar llaves alrededor del link
        if (!response.ok) {
            throw new Error('Network no respondio bien');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
            return data; // Retornar los datos directamente
        } else {
            console.error('Los datos no son un Array:', data);
            return []; // Devolver un array vacío en caso de error
        }
    } catch (error) {
        console.log(error);
        return []; // Devolver un array vacío en caso de error
    }
};



export default fetchGastos; // Exportar la función correctamente
