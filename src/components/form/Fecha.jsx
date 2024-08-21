import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

export default function Fecha({traerFecha}) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (date) {
        try {
          // Solo intenta formatear si date es una fecha válida
          const day = format(date, 'dd');
          const month = format(date, 'MM');
          const year = format(date, 'yyyy');
          console.log(traerFecha(day, month, year));
          traerFecha(day, month, year)

        } catch (error) {
          console.error('Error al formatear la fecha:', error);
        }
      } else {
        // Manejo cuando la fecha es nula
        console.log('Fecha no seleccionada');
      }

    // Aquí podrías enviar los valores separados a tu base de datos
  };

  return (
    <div className='mt-5 w-max'>
      <label htmlFor="datePicker" className="block mb-2 text-sm font-medium  text-white">
        Fecha
      </label>
      <DatePicker
        id="datePicker"
        selected={selectedDate}
        onChange={handleDateChange}
        className=" border w-full  text-sm rounded-lg  block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
}
