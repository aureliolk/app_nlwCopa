import Image from "next/image"
import { use, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

interface FormCreatePoolProps {
    auth: string
}

const Header = ({ auth }: FormCreatePoolProps) => {
    const { user, login, logout } = useContext(AuthContext)

    console.log(user.avatar)
    return (
        <>
            {auth && (
                <div className="absolute top-0 w-[1200px] border m-auto border-borderCopa bg-white/25 rounded p-1 flex justify-between max-md:hidden">
                    <div>
                        <div><strong>Bem vindo:</strong> {user.name}</div>
                    </div>

                    <div>
                    {/* <Image src={} alt={} */}
                    <button onClick={logout}>Sair</button>  
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Header