import { auth } from "../firebase/firebase.config";
import { createContext, useContext, useState, useEffect } from 'react';
import { GoogleAuthProvider, signOut, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import API_URL from '../config.js'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        console.error("Error de autenticación: useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);
    const [gastos, setGastos] = useState(null);
    const [ingresos, setIngresos] = useState(null);
    const [nombreGastos, setNombreGastos] = useState(null);
    const [nombreIngresos, setNombreIngresos] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Aquí obtienes datos adicionales del usuario desde tu base de datos
                    const response = await fetch(`${API_URL}/api/Usuarios/${firebaseUser.uid}`);
                    if (response.ok) {
                        const additionalData = await response.json();
                        // Combina los datos de Firebase con los datos adicionales
                        const combinedUser = {
                            ...additionalData,
                            Nombre_Usuario: firebaseUser.displayName,
                            nombre: firebaseUser.displayName,
                            Mail: firebaseUser.email,
                            FotoPerfil: firebaseUser.photoURL,
                            id: firebaseUser.uid,
                        };
                        setUser(combinedUser);
                        const respGastos = await fetch(`${API_URL}/api/Gastos/usuario/${firebaseUser.uid}`);
                        const respIngresos = await fetch(`${API_URL}/api/Ingresos/usuario/${firebaseUser.uid}`);
                        if (!respGastos.ok || !respIngresos.ok) {
                            throw new Error('Network no respondio bien');
                        }
                        const gast = await respGastos.json();
                        const ing = await respIngresos.json();
                        const respNombreGasto = await fetch(`${API_URL}/api/NombreGastos`);
                        const respNombreIngreso = await fetch(`${API_URL}/api/NombreIngresos`);
                        if (!respNombreGasto.ok || !respNombreIngreso.ok) {
                            throw new Error('Network no respondio bien');
                        }
                        const nombreGasto = await respNombreGasto.json();
                        const nombreIngreso = await respNombreIngreso.json();

                        const gastosConNombres = gast.map(gasto => {
                            const nombreGastoEncontrado = nombreGasto.find(n => n.id === gasto.nombreGastoId);
                            return {
                                ...gasto,
                                nombreGasto: nombreGastoEncontrado ? nombreGastoEncontrado.nombre : 'Nombre no encontrado',
                                icono: nombreGastoEncontrado ? nombreGastoEncontrado.icono : './icono/flecha-gastos.png',
                            };
                        });

                        const ingresosConNombres = ing.map(ing => {
                            const nombreIngresoEncontrado = nombreIngreso.find(n => n.id === ing.nombreIngresoId);
                            return {
                                ...ing,
                                nombreIngreso: nombreIngresoEncontrado ? nombreIngresoEncontrado.nombre : 'Nombre no encontrado',
                                icono: nombreIngresoEncontrado ? nombreIngresoEncontrado.icono : './icono/flecha-ingresos.png',
                            };
                        });
                        
                        

                        setGastos(gastosConNombres);
                        setIngresos(ingresosConNombres);
                        setNombreGastos(nombreGasto);
                        setNombreIngresos(nombreIngreso);
                    } else {
                        console.error('Error al obtener datos del usuario:', response.statusText);
                        setUser(null);
                        setGastos([])
                        setIngresos([])

                    }
                } catch (error) {
                    console.error('Error al obtener datos del usuario:', error);
                    setUser(null);
                }
            } else {
                setUser(null);
                setGastos([])
                setIngresos([])
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);
    const loginWithGoogle = async () => {
        setAuthLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            setUser(result.user);
            return result.user;
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
        }
        finally { // Desactiva el estado de carga
            setAuthLoading(false);
        }
    };


    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };
   

    return (
        <AuthContext.Provider value={{ loginWithGoogle, logout, user, setUser, loading,setLoading, authLoading, gastos, setGastos, ingresos, setIngresos,  nombreGastos, nombreIngresos }}>
            {children}
        </AuthContext.Provider>
    );
}
