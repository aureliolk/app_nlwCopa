import { useContext } from "react"
import { AuthContext } from "../auth/AuthContext"


const Header = () => {
    const { user, login, logout } = useContext(AuthContext)

    return (
        <div className="w-[1200px] border border-borderCopa bg-white/25 rounded p-1 flex justify-between max-md:hidden">
            {user.name ? (
                <div className="flex flex-col items-start">
                    <div><strong>Bem vindo:</strong> {user.name}</div>
                    <button onClick={logout}>Sair</button>
                </div>
            ) : (
                <button onClick={login}>Entrar</button>
            )
            }
        </div >

    )
}

export default Header