import React, { useState } from 'react';
import GoogleIcono from '../iconos/GoogleIcono';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../page/Loading';
import API_URL from '../../config.js'

export default function GoogleBoton() {
  const { loginWithGoogle,  setUser } = useAuth();
  const [loading,setLoading] = useState(false); // Estado de carga para manejar la espera
  const navigate = useNavigate();

  const loginGoogle = async (e) => {
    e.preventDefault();
    setLoading(true); // Activa el estado de carga

    try {
      const users = await loginWithGoogle();
      

      if (users) {
        const userData = {        
          nombre_Usuario: users.displayName,
          nombre: users.displayName,
          mail: users.email,
          fotoPerfil: users.photoURL,
          id: users.uid
        };
        const existingUserResponse = await fetch(`${API_URL}/api/Usuarios/${userData.id}`);
        if (existingUserResponse.ok) {
          const existingUser = await existingUserResponse.json();
          console.log('Usuario existente:', existingUser);

          

          setUser(existingUser);
          localStorage.setItem('fotoPerfil', existingUser.fotoPerfil);
          navigate('/'); // Redirige después de establecer el usuario
        } else {
          const response = await fetch(`${API_URL}/api/Usuarios`, {
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
          setUser(result);
          navigate('/'); // Redirige después de guardar el nuevo usuario
        }
      }
    } catch (error) {
      console.error('Error en la solicitud al backend:', error.message);
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };
  return (
        <button className='shadow-white ' onClick={loginGoogle}>
          <GoogleIcono />
        </button>
  
  );
}
