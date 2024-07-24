import React, { useState } from 'react';
import GoogleIcono from '../iconos/GoogleIcono';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../page/Loading';

export default function GoogleBoton() {
  const { loginWithGoogle, user, setUser, authLoading } = useAuth();
  const [loading, setLoading] = useState(false); // Estado de carga para manejar la espera
  const navigate = useNavigate();

  const loginGoogle = async (e) => {
    e.preventDefault();
    setLoading(true); // Activa el estado de carga

    try {
      const users = await loginWithGoogle();

      if (users) {
        const userData = {        
          Nombre_Usuario: users.displayName,
          Nombre: users.displayName,
          Mail: users.email,
          FotoPerfil: users.photoURL,
          id: users.uid
        };

        const existingUserResponse = await fetch(`http://localhost:5042/api/Usuarios/mail/${userData.Mail}`);
        if (existingUserResponse.ok) {
          const existingUser = await existingUserResponse.json();
          console.log('Usuario existente:', existingUser);

          setUser(existingUser);
          navigate('/'); // Redirige después de establecer el usuario
        } else {
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
  if (loading || authLoading) {
    return <Loading />;
  }
  return (
        <button className='shadow-white ' onClick={loginGoogle}>
          <GoogleIcono />
        </button>
  
  );
}
