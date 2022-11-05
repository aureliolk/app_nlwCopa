//Inside the AuthContext file.

import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { createContext, PropsWithChildren, useState, useEffect } from "react";
import { auth } from "./firebase";


interface UserProps {
    name: string | null
    avatar?: string | null
    token?: string | null
}

interface AuthContextProps {
    login: () => void
    logout: () => void
    user: UserProps
    isLoading: boolean
}

// Inside AuthProvider 
const provider = new GoogleAuthProvider();





export const AuthContext = createContext({} as AuthContextProps)

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState({} as UserProps)
    const [isLoading, setIsLoading] = useState(false)

    const login = () => {
        setIsLoading(true)
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
                // console.log({ credential, token, user });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log({ errorCode, errorMessage, email, credential });
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    const logout = () => {
        setIsLoading(true)
        auth.signOut();
        setIsLoading(false)
        console.log("logout");
    };


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("logado")
                setUser({
                    name: user.displayName
                })

            } else {
                console.log("deslogado")
                setUser({
                    name: null
                })
            }
        });
    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, user, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}