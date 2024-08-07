import { auth } from "../firebase/firebase.config";
import { createContext, useContext, useState, useEffect } from 'react';
import { GoogleAuthProvider, signOut, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { id } from "date-fns/locale";

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
    const [tipoGastos, setTipoGastos] = useState(null);
    const [tipoIngresos, setTipoIngresos] = useState(null);
    const [nombreGastos, setNombreGastos] = useState(null);
    const [nombreIngresos, setNombreIngresos] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Aquí obtienes datos adicionales del usuario desde tu base de datos
                    const response = await fetch(`http://192.168.0.29:5042/api/Usuarios/${firebaseUser.uid}`);
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
                        const respGastos = await fetch(`http://192.168.0.29:5042/api/Gastos/usuario/${firebaseUser.uid}`);
                        const respIngresos = await fetch(`http://192.168.0.29:5042/api/Ingresos/usuario/${firebaseUser.uid}`);
                        if (!respGastos.ok || !respIngresos.ok) {
                            throw new Error('Network no respondio bien');
                        }
                        const gast = await respGastos.json();
                        const ing = await respIngresos.json();
                        setGastos(gast);
                        setIngresos(ing);
                        const respTipoGasto = await fetch(`http://192.168.0.29:5042/api/TipoGastos`);
                        const respTipoIngreso = await fetch(`http://192.168.0.29:5042/api/TipoIngresos`);
                        const respNombreGasto = await fetch(`http://192.168.0.29:5042/api/NombreGastos`);
                        const respNombreIngreso = await fetch(`http://192.168.0.29:5042/api/NombreIngresos`);
                        if (!respTipoGasto.ok || !respTipoIngreso.ok || !respNombreGasto.ok || !respNombreIngreso.ok) {
                            throw new Error('Network no respondio bien');
                        }
                        const tipoGasto = await respTipoGasto.json();
                        const tipoIngreso = await respTipoIngreso.json();
                        const nombreGasto = await respNombreGasto.json();
                        const nombreIngreso = await respNombreIngreso.json();

                        setTipoGastos(tipoGasto);
                        setTipoIngresos(tipoIngreso);
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
            localStorage.setItem('photoUser', result.user.photoURL);
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
        <AuthContext.Provider value={{ loginWithGoogle, logout, user, setUser, loading, authLoading, gastos, setGastos, ingresos, setIngresos, tipoGastos, tipoIngresos, nombreGastos, nombreIngresos }}>
            {children}
        </AuthContext.Provider>
    );
}
