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
import Loading from '../page/Loading'

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
    <div className="min-w-fit  max-w-3xl bg-gray-800 flex flex-col justify-between  rounded-lg shadow-md p-4 my-8">

      <div className="mb-6 flex flex-col items-center">
        <h2 className="text-2xl text-yellow-100 font-bold text-center mb-4">GRAFICO DE {title}</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64 text-white">
            <Loading/>
          </div>
        ) : (
            <Pie data={chartData} options={options}/>



        )}
        <div className='w-full mt-5'>
          <h3 className="text-xl font-lato font-semibold  text-yellow-100">Resumen</h3>
        </div>
        <div className="mt-3 flex flex-col justify-start">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.labels.map((label, index) => (
              <div key={label} className="flex justify-between items-center p-3 text-white border border-red-200 rounded">
                <span className="font-medium pr-3">{label}:</span>
                <span className="font-bold">$ {numeroConSeparacion(data.datasets[0].data[index])}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="mt-4 p-3 border text-gray-800   bg-yellow-100 rounded flex justify-center gap-10 ">
        <p className="lg:text-2xl text-sm  text-start font-extrabold ">
          TOTAL DE {title}:
        </p>
        <p className="text-sm lg:text-2xl font-extrabold text-start ">
          $ {numeroConSeparacion(total)}
        </p>
      </div>
    </div>
  )

}