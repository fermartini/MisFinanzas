import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import HomeIcono from './iconos/HomeIcono';
import ResumenIcono from './iconos/ResumenIcono';
import AddIcono from './iconos/AddIcono';
import GraficosIconos from './iconos/GraficosIconos';
import PerfilIcono from './iconos/PerfilIcono';
import { useAuth } from '../context/authContext';
import LoginIcon from './iconos/LoginIcono';

export default function NavBar() {
    const { user, logout, loading, authLoading } = useAuth();
    const [src, setSrc] = useState('https://fermartini.github.io/imggastapp/perfil/sin-foto.png');

    useEffect(() => {
        setSrc(localStorage.getItem('fotoPerfil') || 'https://fermartini.github.io/imggastapp/perfil/sin-foto.png');
        

    }, [user]);

    const navigate = useNavigate();
    const location = useLocation();

    const cerrarSesion = async (e) => {
        e.preventDefault();
        Swal.fire(
            {
                title: 'Estas cerrando sesion',
                text: '¿Estas seguro?',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Cerrar Sesion',
                customClass: {
                    confirmButton: 'bg-red-500 text-white px-4 py-2 mx-3 rounded',
                    cancelButton: 'bg-gray-300 text-black px-4 py-2 mx-3 rounded',
                },
                buttonsStyling: false,
            }
        ).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await logout();
                    localStorage.clear();
                    navigate('/login');
                } catch (error) {
                    console.error("Error al cerrar sesión:", error);
                }
            }
        });
    };

    return (
        <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 border  rounded-full bottom-4 left-1/2 bg-gray-700 dark:bg-gray-700 border-gray-600 dark:border-gray-600">
            <div className="grid h-full w-lg grid-cols-5 mx-auto">
                <Link to='/' data-tooltip-target="tooltip-home" type="Link" className={`inline-flex flex-col items-center justify-center px-5 rounded-s-full   hover:bg-gray-800 group ${location.pathname === '/' ? 'bg-gray-800 text-blue-700' : 'text-gray-400'}`}>
                    <HomeIcono />
                </Link>
                <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300  rounded-lg shadow-sm opacity-0 tooltip bg-gray-700">
                    Home
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Link to='/resumen' data-tooltip-target="tooltip-wallet" type="Link" className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800 group ${location.pathname === '/resumen' ? 'bg-gray-800  text-blue-700' : 'text-gray-400'}`}>
                    <ResumenIcono />
                </Link>
                <div id="tooltip-wallet" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300  rounded-lg shadow-sm opacity-0 tooltip bg-gray-700">
                    Resumen
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <div className={`flex items-center justify-center ${location.pathname === '/add' ? 'bg-gray-800' : ''}`}>
                    <Link to='/add' data-tooltip-target="tooltip-new" type="Link" className={`inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 active:translate-y-1 active:bg-green-800   ${location.pathname === '/add' ? 'bg-green-800 hover:bg-green-900' : ''}`}>
                        <AddIcono add={location.pathname === '/resumen' ? 'text-blue-700' : ''} />
                    </Link>
                </div>
                <div id="tooltip-new" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 rounded-lg shadow-sm opacity-0 tooltip bg-gray-700">
                    Agregar gasto/ingreso
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Link to='/resumen/grafico' data-tooltip-target="tooltip-settings" type="Link" className={`inline-flex flex-col items-center justify-center px-5  hover:bg-gray-800 group ${location.pathname === '/resumen/grafico' ? 'bg-gray-800 text-blue-700' : 'text-gray-400'}`}>
                    <GraficosIconos />
                </Link>
                <div id="tooltip-settings" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 rounded-lg shadow-sm opacity-0 tooltip bg-gray-700">
                    Graficos
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <Link to='/perfil' data-tooltip-target="tooltip-profile" type="Link" className="inline-flex flex-col items-center justify-center px-5 rounded-e-full  hover:bg-gray-800 group" onClick={cerrarSesion} >
                    <PerfilIcono perfil={src} />
                </Link>
                <div id="tooltip-profile" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300  rounded-lg shadow-sm opacity-0 tooltip bg-gray-700">
                    Perfil
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
        </div>
    );
}
