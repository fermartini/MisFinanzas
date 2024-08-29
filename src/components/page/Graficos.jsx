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

  const [gastoFiltrado, setGastoFiltrado] = useState([])
  const [ingresoFiltrado, setIngresoFiltrado] = useState([])

  const meses = [];
  const anio = [2024, 2025, 2026]

  for (let i = 0; i < 12; i++) {
    const fecha = new Date(2024, i); // Año arbitrario, 2024 en este caso
    const nombreMes = fecha.toLocaleString('es-ES', { month: 'long' });
    const numeroMes = i + 1; // Sumamos 1 para que enero sea 1 y diciembre sea 12

    meses.push({ label: nombreMes, value: numeroMes });
  }
  const mes = new Date().toLocaleString('es-ES', { month: 'long' })

  const mesNumero = new Date().getMonth() + 1
  const [mesElegido, setMesElegido] = useState({ value: mesNumero, label: mes.toUpperCase() })
  const [anioElegido, setAnioElegido] = useState({ value: new Date().getFullYear(), label: new Date().getFullYear() })

  const buscarMesPorValue = (value) => {
    const mes = meses.find(m => m.value == value);
    return mes ? mes.label.toUpperCase() : 'Mes no encontrado';
  };


  const cambioMes = (e) => {
    const { name, value } = e.target;
    setMesElegido({
      value: parseInt(value),
      label: buscarMesPorValue(value)

    })
  }

  const cambioAnio = (e) => {
    const { value } = e.target;
    setAnioElegido({
      value: parseInt(value),
      label: parseInt(value)

    })
  }




  useEffect(() => {
    if (gastos) {
      setGastoFiltrado(gastos.filter(gasto => gasto.mes == mesElegido.value && gasto.anio == anioElegido.value))

    }


  }, [mesElegido, anioElegido, gastos])

  useEffect(() => {
    if (gastoFiltrado) {
      prepareChartData(gastoFiltrado, setGastosChartData);
    }
  }, [gastoFiltrado, mesElegido, anioElegido]);
  useEffect(() => {
    if (ingresos) {
      setIngresoFiltrado(ingresos.filter(ingreso => ingreso.mes == mesElegido.value && ingreso.anio == anioElegido.value))
    }


  }, [mesElegido, anioElegido, ingresos])
  useEffect(() => {
    if (ingresoFiltrado) {
      prepareChartData(ingresoFiltrado, setIngresosChartData);
    }
  }, [ingresoFiltrado, mesElegido, anioElegido]);

  const prepareChartData = (data, setChartData) => {
    if (data.length === 0) {
      // Si no hay datos, establece datos vacíos
      setChartData({
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            borderColor: [],
          },
        ],
      });
      return;
    }

    const agrupados = data.reduce((acc, item) => {
      const nombre = item.nombreGasto || item.nombreIngreso;
      if (!acc[nombre]) {
        acc[nombre] = 0;
      }
      acc[nombre] += parseFloat(item.importe);
      return acc;
    }, {});

    const labels = Object.keys(agrupados);
    const valores = Object.values(agrupados);
    const colors = generateColors(labels.length);

    setChartData({
      labels,
      datasets: [
        {
          data: valores,
          backgroundColor: colors,
          borderColor: colors.map(color => color.replace('0.6', '1')),
        },
      ],
    });
  };

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
    <div className="min-h-screen mt-10 mb-20 ">
      <div className='flex flex-col items-center'>
        <h2 className='text-gray-300 text-center text-5xl' >GRAFICOS</h2>
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
      </div>


      <div className='flex flex-col lg:flex-row justify-center mx-5 gap-5 '>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 '>
          
          <GraficosCard
            key={`gastos-${mesElegido.value}-${anioElegido.value}`}
            data={gastosChartData}
            title={`GASTOS`}
            loading={loading}
          />
          <GraficosCard
            key={`ingresos-${mesElegido.value}-${anioElegido.value}`}
            data={ingresosChartData}
            title={`INGRESOS`}
            loading={loading}
          />

        </div>

      </div>

    </div>
  )
}