import Image from "next/image"
import { CaretDoubleDown, PlusCircle } from "phosphor-react"
import { use, useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"

interface FormCreatePoolProps {
    auth: string
}

const Header = ({ auth }: FormCreatePoolProps) => {
    const { user, login, logout } = useContext(AuthContext)
    const [showMenuMobile, setShowMenuMobile] = useState(false)
    console.log(showMenuMobile)
    return (
        <>
            {auth && (
                <>
                    <div className="w-[80%] lg:max-w-[1200px] m-auto bg-white/25 rounded rounded-t-none px-4 py-2 flex justify-between items-center transition-all" style={showMenuMobile ? { "top": "0" } : { "marginTop": "-70px" }}>
                        <div className="flex  rounded flex-col justify-between">
                            <strong className="text-bgButton text-lg">Bem vindo</strong>

                            {user.name && (
                                <div className="text-white"> {user.name}</div>
                            )}
                        </div>
                        <div className=" flex gap-10 text-white max-md:hidden">
                            <button className="flex gap-x-2 items-center h-8 px-5 rounded text-sm hover:bg-bgButton/40 "><PlusCircle size={25} /> Novo Bolão</button>
                            <button className="flex gap-x-2 items-center h-8 px-5 rounded text-sm hover:bg-bgButton/40 "><PlusCircle size={25} /> Meus Bolões</button>
                        </div>
                        <div className="flex justify-between flex-col hover:bg-white/40 p-1 rounded cursor-pointer" onClick={logout}>
                            {user.avatar && (
                                <Image src={user.avatar as any} alt="Imagem do User" quality={100} width={30} height={30} className="rounded-[50%]" />
                            )}
                            <span className="text-xs text-white text-center">Sair</span>
                        </div>
                    </div>
                    <div className="text-center cursor-pointer transition-all animate-pulse" onClick={() => { setShowMenuMobile(!showMenuMobile) }}>
                        <CaretDoubleDown size={35} className="text-bgButton m-auto transition-all" style={showMenuMobile ? { "rotate": "180deg" } : { "rotate": "initial" }} />
                    </div>
                </>
            )
            }

        </>
    )
}

export default Header