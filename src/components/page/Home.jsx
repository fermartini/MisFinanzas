import React from 'react'
import { useAuth } from '../../context/authContext'

export default function Home() {
  const { user } = useAuth();
  console.log('====================================');
  console.log(user);
  console.log('====================================');
  return (
    <div className='h-screen flex justify-center items-center text-yellow-100 text-5xl'>Bienvenido {user?.nombre}</div>
  )
}
