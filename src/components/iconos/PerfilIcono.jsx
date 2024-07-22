import React from 'react'

export default function PerfilIcono() {
    return (
        <>
            <img src={localStorage.getItem('usuario')} alt=""  className='rounded-full h-100 p-1'/>
            <span className="sr-only">Perfil</span>
        </>
    )
}
