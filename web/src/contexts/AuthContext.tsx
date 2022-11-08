//Inside the AuthContext file.
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { createContext, PropsWithChildren, useState, useEffect } from "react";
import { auth } from "../auth/firebase";
import { api } from "../lib/axiox";
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router'

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
    const router = useRouter()

    const login = () => {
        setIsLoading(true)
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const access_token = credential?.accessToken;

                setCookie("access_token", access_token, { maxAge: 60 * 6 * 24 })

                const token = await api.post("/users", {
                    access_token: getCookie("access_token")
                })
                console.log("token:" + {token})
                
                // api.defaults.headers.common["Authorization"] = `Bearer ${token.data}`
                
                router.push("/")
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
        deleteCookie("access_token")
        router.push("/")
        setIsLoading(false)
        console.log("logout");
    };

    useEffect(() => {
        onAuthStateChanged(auth,async (user) => {
            if (user) {
                setUser({
                    name: user.displayName,
                    avatar: user.photoURL
                })
            } else {
                console.log("no user");
            }
        });
    }, []);


    return (
        <AuthContext.Provider value={{ login, logout, user, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}