import Image from "next/image"
import { use, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

interface FormCreatePoolProps {
    auth: string
}

const Header = ({ auth }: FormCreatePoolProps) => {
    const { user, login, logout } = useContext(AuthContext)
    return (
        <>
            {auth && (
                <div className="absolute top-0 w-[1200px] m-auto border-borderCopa bg-white/25 rounded rounded-t-none px-4 py-2  flex justify-between max-md:hidden">
                    <div className="flex  rounded flex-col justify-between">
                        <strong className="text-bgButton text-lg">Bem vindo</strong>
                        {user.name && (
                            <div className="text-white"> {user.name}</div>
                        )}
                    </div>

                    <div className="flex justify-between flex-col hover:bg-white/40 p-1 rounded cursor-pointer" onClick={logout}>
                        {user.avatar && (
                            <Image src={user.avatar as any} alt="Imagem do User" quality={100} width={30} height={30} className="rounded-[50%]" />
                        )}
                        <span className="text-xs text-white text-center">Sair</span>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Header