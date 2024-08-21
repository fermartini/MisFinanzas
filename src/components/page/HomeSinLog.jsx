import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado

const HomeSinLog = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="container mx-auto p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">MiApp de Gastos</h1>
                    <nav>
                        <Link to="/login" className="text-blue-500 mx-2">Iniciar sesión</Link>
                        <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded">Registrarse</Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-blue-500 text-white text-center py-20">
                <h2 className="text-4xl font-bold">Gestiona tus gastos fácilmente</h2>
                <p className="mt-4 text-lg">Controla tus finanzas de manera sencilla con nuestra aplicación intuitiva.</p>
                <Link to="/register" className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded">Empieza Ahora</Link>
            </section>

            {/* Features Section */}
            <section className="container mx-auto p-8">
                <h3 className="text-3xl font-bold text-center mb-8">Características Principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h4 className="text-xl font-semibold mb-2">Fácil Gestión de Gastos</h4>
                        <p>Organiza y categoriza tus gastos en minutos.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h4 className="text-xl font-semibold mb-2">Reportes Detallados</h4>
                        <p>Obtén informes y gráficos sobre tus finanzas.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h4 className="text-xl font-semibold mb-2">Acceso desde Cualquier Dispositivo</h4>
                        <p>Gestiona tus finanzas desde tu móvil o computadora.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gray-200 py-8">
                <div className="container mx-auto p-8">
                    <h3 className="text-3xl font-bold text-center mb-8">Lo que dicen nuestros usuarios</h3>
                    <div className="flex flex-wrap justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center mx-4">
                            <p>"Una herramienta increíble que me ha ayudado a controlar mis finanzas con facilidad."</p>
                            <p className="font-semibold mt-2">- Juan Pérez</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center mx-4">
                            <p>"El mejor gestor de gastos que he usado. Muy intuitivo y útil."</p>
                            <p className="font-semibold mt-2">- María García</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white shadow-md py-4">
                <div className="container mx-auto text-center">
                    <p className="text-gray-600">© 2024 MiApp de Gastos. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomeSinLog;
