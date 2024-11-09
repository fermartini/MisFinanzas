"use client"

import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import GraficosCard from '../cards/GraficosCard.jsx'
import './add.css'
import Select from '../form/Select.jsx'
import Loading from './Loading.jsx'

export default function Graficos() {
  const { gastos, ingresos, loading, user, setLoading } = useAuth()
  const [gastosChartData, setGastosChartData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [], borderColor: [] }],
  })
  const [ingresosChartData, setIngresosChartData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [], borderColor: [] }],
  })
  const [balancesChartData, setBalanceChartData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [], borderColor: [] }],
  })

  const [gastoFiltrado, setGastoFiltrado] = useState([])
  const [ingresoFiltrado, setIngresoFiltrado] = useState([])
  const [balance, setBalance] = useState(0)

  const meses = [
    { label: 'Todos', value: 0 },
    ...Array.from({ length: 12 }, (_, i) => {
      const fecha = new Date(2024, i)
      return {
        label: fecha.toLocaleString('es-ES', { month: 'long' }),
        value: i + 1
      }
    })
  ]

  const anio = [2024, 2025, 2026]

  const [mesElegido, setMesElegido] = useState({ value: new Date().getMonth() + 1, label: new Date().toLocaleString('es-ES', { month: 'long' }).toUpperCase() })
  const [anioElegido, setAnioElegido] = useState({ value: new Date().getFullYear(), label: new Date().getFullYear() })

  const buscarMesPorValue = (value) => {
    const mes = meses.find(m => m.value == value)
    return mes ? mes.label.toUpperCase() : 'Mes no encontrado'
  }

  const cambioMes = (e) => {
    const { value } = e.target
    setMesElegido({
      value: parseInt(value),
      label: buscarMesPorValue(value)
    })
  }

  const cambioAnio = (e) => {
    const { value } = e.target
    setAnioElegido({
      value: parseInt(value),
      label: parseInt(value)
    })
  }

  useEffect(() => {
    if (gastos) {
      setGastoFiltrado(gastos.filter(gasto => 
        gasto.anio == anioElegido.value && (mesElegido.value === 0 || gasto.mes == mesElegido.value)
      ))
    }
  }, [mesElegido, anioElegido, gastos])

  useEffect(() => {
    if (gastoFiltrado) {
      prepareChartData(gastoFiltrado, setGastosChartData)
    }
  }, [gastoFiltrado])

  useEffect(() => {
    if (ingresos) {
      setIngresoFiltrado(ingresos.filter(ingreso => 
        ingreso.anio == anioElegido.value && (mesElegido.value === 0 || ingreso.mes == mesElegido.value)
      ))
    }
  }, [mesElegido, anioElegido, ingresos])

  useEffect(() => {
    if (ingresoFiltrado) {
      prepareChartData(ingresoFiltrado, setIngresosChartData)
    }
  }, [ingresoFiltrado])

  useEffect(() => {
    const totalIngresos = ingresoFiltrado.reduce((acc, item) => acc + parseFloat(item.importe), 0)
    const totalGastos = gastoFiltrado.reduce((acc, item) => acc + parseFloat(item.importe), 0)
    setBalance(totalIngresos - totalGastos)

    // Prepare balance chart data
    setBalanceChartData({
      labels: ['Ingresos', 'Gastos'],
      datasets: [{
        data: [totalIngresos, totalGastos],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
      }]
    })
  }, [ingresoFiltrado, gastoFiltrado])

  const prepareChartData = (data, setChartData) => {
    if (data.length === 0) {
      setChartData({
        labels: [],
        datasets: [{ data: [], backgroundColor: [], borderColor: [] }],
      })
      return
    }

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
      datasets: [{
        data: valores,
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace('0.6', '1')),
      }],
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

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    )
  }

  return (
    <section className="min-h-screen mt-10 mb-20">
      <article className='flex flex-col items-center'>
        <h1 className='text-gray-300 text-center text-5xl'>GRÁFICOS</h1>
        <div className='grid grid-cols-2 gap-10 mb-2 text-center'>
          <Select
            name={mesElegido.label}
            value={mesElegido.value}
            onChange={cambioMes}
            options={meses.map((mes) => ({ value: mes.value, label: mes.label }))}
            label='Mes'
          />
          <Select
            name={anioElegido.value}
            value={anioElegido.value}
            onChange={cambioAnio}
            options={anio.map((anio) => ({ value: anio, label: anio }))}
            label='Año'
          />
        </div>
      </article>

      <article className='flex flex-col lg:flex-row justify-center mx-5 gap-5'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          <GraficosCard
            key={`gastos-${mesElegido.value}-${anioElegido.value}`}
            data={gastosChartData}
            title={mesElegido.value === 0 ? `GASTOS ANUALES ${anioElegido.label}` : `GASTOS ${mesElegido.label} ${anioElegido.label}`}
            loading={loading}
          />
          <GraficosCard
            key={`ingresos-${mesElegido.value}-${anioElegido.value}`}
            data={ingresosChartData}
            title={mesElegido.value === 0 ? `INGRESOS ANUALES ${anioElegido.label}` : `INGRESOS ${mesElegido.label} ${anioElegido.label}`}
            loading={loading}
          />
          <GraficosCard
            key={`balance-${mesElegido.value}-${anioElegido.value}`}
            data={balancesChartData}
            title={mesElegido.value === 0 ? `BALANCE ANUAL ${anioElegido.label}` : `BALANCE ${mesElegido.label} ${anioElegido.label}`}
            loading={loading}
          />
        </div>
      </article>
    </section>
  )
}