import React from 'react';
import GoogleIcono from '../iconos/GoogleIcono';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function GoogleBoton() {
  const { loginWithGoogle  } = useAuth();
  const navigate = useNavigate();

  const loginGoogle = async (e) => {
    e.preventDefault();
    const user = await loginWithGoogle();   
    
    if (user) {
      const userData = {
        Nombre_Usuario: user.uid,
        Nombre: user.displayName,
        Mail: user.email,
        FotoPerfil: user.photoURL
      };

      try {
        const existingUserResponse = await fetch(`http://localhost:5042/api/Usuarios/mail/${userData.Mail}`);
        if (existingUserResponse.ok) {
          const existingUser = await existingUserResponse.json();
          console.log('Usuario existente:', existingUser);
          
        localStorage.setItem('usuarioId', existingUser.id)
          // Aquí podrías manejar el redireccionamiento a la pantalla principal si el usuario ya existe
          
          navigate('/')
          
          return;
        }
        const response = await fetch('http://localhost:5042/api/Usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Algo salió mal');
        }

        const result = await response.json();
        console.log('Usuario guardado correctamente', result);
        localStorage.setItem('usuarioId', result.id)
        navigate('/')
      } catch (error) {
        console.error('Error en la solicitud al backend:', error.message);
      }
    }
  };

  return (
    <button className='shadow-white ' onClick={loginGoogle}>
      <GoogleIcono />
      
    </button>
  );
}
