//Inside the AuthContext file.

import axios from "axios";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { createContext, PropsWithChildren, useState, useEffect } from "react";
import { auth } from "../auth/firebase";
import { api } from "../lib/axiox";


interface UserProps {
    name: string | null
    avatar: string | null
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
            .then(async (result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const access_token = credential?.accessToken;
                // const user = result.user;

                const userId = await api.post("/users", {
                    access_token
                })

                api.defaults.headers.common["Authorization"] = `Bearer ${userId.data}`

                const userInfor = await api.get("/me")

                console.log(userInfor)

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




    return (
        <AuthContext.Provider value={{ login, logout, user, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}