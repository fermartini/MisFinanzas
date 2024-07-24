import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sesion from './components/page/Sesion';
import { AuthProvider, useAuth } from './context/authContext'; // Asegúrate de exportar useAuth de tu contexto
import Home from './components/page/Home';
import NavBar from './components/NavBar';
import Resumen from './components/page/Resumen';
import Add from './components/page/Add';
import Graficos from './components/page/Graficos';
import Perfil from './components/page/Perfil';// Componente de carga
import Loading from './components/page/Loading';

function AppContent() {
  const { loading, authLoading } = useAuth();

  if (loading || authLoading) {
    return <Loading/>; // Mostrar pantalla de carga mientras se obtiene la información del usuario
  }
  else{
    return (
      <>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/resumen' element={<Resumen />} />
          <Route path='/add' element={<Add />} />
          <Route path='/resumen/grafico' element={<Graficos />} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/login' element={<Sesion />} />
        </Routes>
      </>
    );
  }

  
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <main className='overflow-x-hidden'>
          <div className="absolute top-0 z-[-2] max-h-fit w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
            <AppContent />
          </div>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
