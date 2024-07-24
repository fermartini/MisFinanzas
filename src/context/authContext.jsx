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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Aquí obtienes datos adicionales del usuario desde tu base de datos
                    const response = await fetch(`http://localhost:5042/api/Usuarios/${firebaseUser.uid}`);
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
                    } else {
                        console.error('Error al obtener datos del usuario:', response.statusText);
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Error al obtener datos del usuario:', error);
                    setUser(null);
                }
            } else {
                setUser(null);
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
        <AuthContext.Provider value={{  loginWithGoogle, logout,user, setUser, loading , authLoading  }}>
            {children}
        </AuthContext.Provider>
    );
}
