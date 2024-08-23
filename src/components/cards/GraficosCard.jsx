"use client"

import React from 'react'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { numeroConSeparacion } from '../funciones'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

export default function GraficosCard({ data, title, loading }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.datasets[0].data,
        backgroundColor: data.datasets[0].backgroundColor,
        borderColor: data.datasets[0].borderColor,
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 20
        }
      },
    },
  }

  const total = data.datasets[0].data.reduce((a, b) => a + b, 0)

  return (
    <div className="min-w-fit max-w-3xl bg-slate-900  flex flex-col justify-between  rounded-lg shadow-md p-4 my-8">
      
      <div className="mb-6 flex flex-col items-center">
      <h2 className="text-2xl text-yellow-100 font-bold text-center mb-4">Grafico de {title}</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Cargando...</p>
          </div>
        ) : (
          <div class='w-52'>
            <Pie data={chartData} options={options}  /> 
          </div>
          
        )}
        <div className='w-full mt-5'>
        <h3 className="text-xl font-semibold mb-3 text-yellow-100">Resumen</h3>
        </div>
        <div className="mt-6 flex flex-col justify-start">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.labels.map((label, index) => (
            <div key={label} className="flex justify-between items-center p-3 text-white border border-yellow-100 rounded">
              <span className="font-medium pr-3">{label}:</span>
              <span className="font-bold">$ {numeroConSeparacion(data.datasets[0].data[index])}</span>
            </div>
          ))}
        </div>
        
      </div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-200 rounded flex gap-10">
          <p className="text-lg font-bold text-start ">
            Total de {title}: 
          </p>
          <p className="text-lg font-bold text-start "> 
          $ {numeroConSeparacion(total)}
          </p>
        </div>
    </div>
  )
}