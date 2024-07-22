import { auth } from "../firebase/firebase.config";
import { createContext, useContext, useState, useEffect } from 'react';
import { GoogleAuthProvider, signOut, signInWithPopup, onAuthStateChanged } from "firebase/auth";

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

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);            
            setUser(result.user);
            localStorage.setItem('usuario', result.user.photoURL)
            return result.user;
            
            
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
        }
    };


    const logout = async () => {
        try {
            await signOut(auth);
            localStorage.clear()
            setUser(null);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <AuthContext.Provider value={{  loginWithGoogle, logout,user }}>
            {children}
        </AuthContext.Provider>
    );
}
