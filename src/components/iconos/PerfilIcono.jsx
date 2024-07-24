import React from 'react';

export default function PerfilIcono({ perfil }) {
    return (
        <img
            src={perfil} // Ruta a una imagen por defecto si perfil está vacío
            alt="Perfil"
            className="w-8 h-8 rounded-full"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = "path/to/default/image.png"; // Ruta a una imagen por defecto
            }}
        />
    );
}
