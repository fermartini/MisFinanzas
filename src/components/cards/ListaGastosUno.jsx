import React, { useState } from 'react';
import Delete from '../form/Delete';

export default function ListaGastosUno({ detalle, importe, eliminar, dia, mes, anio, idGasto, bool, tipo }) {
  const [isChecked, setIsChecked] = useState(bool);

  const handleCheckboxChange = async () => {
    // Invertir el estado del checkbox
    bool ? setIsChecked(true) : setIsChecked(false);
    setIsChecked(!isChecked);

    try {
      // Hacer la solicitud PUT a la API para cambiar el valor de 'Pagado'

      const url = tipo === 'Ingresos' ? `${process.env.REACT_APP_API_URL}/api/Ingresos/${idGasto}/cobrado` : `${process.env.REACT_APP_API_URL}/api/Gastos/${idGasto}/pagado`;
      
      const response = await fetch(`${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // No necesitamos un cuerpo, porque el valor cambia automáticamente de 0 a 1 (y viceversa)
      });

      if (!response.ok) {
        throw new Error('No se pudo actualizar el estado de Pagado');
      }

      // Si todo sale bien, el estado de 'isChecked' ya se ha actualizado
      // Esto reflejará el cambio en la UI automáticamente
    } catch (error) {
      console.error(error);
      // Si ocurre un error, podemos revertir el cambio en el estado del checkbox
      setIsChecked(!isChecked);
    }
  };

  return (
    <div className="flow-root">
      <ul role="list" className="divide-y divide-gray-700 w-full border-b border-blue-300">
        <li className={`py-3 sm:py-4 gap-5 grid grid-cols-4 ${isChecked ? 'bg-gray-800' : ''}`}>
          <div className="flex gap-3 justify-around">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <p className={`text-xs xl:text-sm truncate m-0 p-0 ${isChecked ? 'text-green-500' : 'text-red-600'}`}>
              {dia}
            </p>
          </div>

          <p className={`text-xs truncate ${isChecked ? 'text-green-500' : 'text-red-600'}`}>
            {detalle}
          </p>

          <span className={`text-sm text-center text-nowrap ${isChecked ? 'text-green-500' : 'text-red-600'}`}>
            $ {importe}
          </span>
          <button onClick={eliminar} className="flex justify-end">
            <Delete />
          </button>
        </li>
      </ul>
    </div>
  );
}
