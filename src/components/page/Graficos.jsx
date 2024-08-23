"use client"

import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import GraficosCard from '../cards/GraficosCard.jsx'

export default function Graficos() {
  const { gastos, ingresos, loading } = useAuth()
  const [gastosChartData, setGastosChartData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [], borderColor: [] }],
  })
  const [ingresosChartData, setIngresosChartData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [], borderColor: [] }],
  })

  useEffect(() => {
    if (gastos && gastos.length > 0) {
      prepareChartData(gastos, setGastosChartData)
    }
    if (ingresos && ingresos.length > 0) {
      prepareChartData(ingresos, setIngresosChartData)
    }
  }, [gastos, ingresos])

  const prepareChartData = (data, setChartData) => {
    const agrupados = data.reduce((acc, item) => {
      const nombre = item.nombreGasto || item.nombreIngreso
      if (!acc[nombre]) {
        acc[nombre] = 0
      }
      acc[nombre] += parseFloat(item.importe)
      return acc
    }, {})

    const labels = Object.keys(agrupados)
    const valores = Object.values(agrupados)
    const colors = generateColors(labels.length)

    setChartData({
      labels,
      datasets: [
        {
          data: valores,
          backgroundColor: colors,
          borderColor: colors.map(color => color.replace('0.6', '1')),
        },
      ],
    })
  }

  const generateColors = (count) => {
    const baseColors = [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
    ]
    return Array(count).fill().map((_, i) => baseColors[i % baseColors.length])
  }

  return (
    <div className="min-h-screen mt-5">
      <h2 className='text-gray-300 text-center text-5xl lg:text-8xl' >GRAFICOS</h2>
      <div className='flex flex-col lg:flex-row justify-center mx-5 gap-5'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          <GraficosCard
            data={gastosChartData}
            title="Gastos"
            loading={loading}
          />
          <GraficosCard
            data={ingresosChartData}
            title="Ingresos"
            loading={loading}
          />
        </div>

      </div>

    </div>
  )
}