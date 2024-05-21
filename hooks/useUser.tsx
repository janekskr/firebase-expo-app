import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../firebaseConfig";

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState< User | null >(null)


    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user)
        })
    }, [user])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}