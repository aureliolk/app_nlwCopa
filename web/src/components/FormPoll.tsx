import { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../auth/AuthContext"
import { Clipboard } from "phosphor-react"
import { api } from "../lib/axiox"
import Button from "./Button"
import Loading from "./Loading"




export const FormCreatePool = () => {
    const [namePool, setNamePool] = useState("")
    const [code, setCode] = useState("")
    const { user, login, isLoading } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [isCodeLoading, setIsCodeLoading] = useState(false)



    const createPool = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await api.post("/pools/add", {
                title: namePool
            })
            const { code } = res.data
            console.log(code)
            await navigator.clipboard.writeText(code)
            setCode(code)
            // alert(`Seu Bolão ${code}, foi criado com Sucesso.`)
            setNamePool("")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const codeIsLoading = async () => {
        setIsCodeLoading(true)
        await navigator.clipboard.writeText(code)
        setTimeout(() => {
            setIsCodeLoading(false)
        }, 1000)
    }

    return (
        <form className="flex gap-1 flex-col" onSubmit={createPool}>
            {user.name ? (
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2  md:flex-row md:gap-0">
                        <input
                            className=" md:w-[306px] py-4 px-6 h-[58px] bg-[#202024] border-borderCopa rounded text-sm text-textGrayDark max-md:text-center"
                            type="text"
                            placeholder="Qual nome do seu bolão?"
                            onChange={(e) => { setNamePool(e.target.value), setCode("") }}
                            value={namePool}
                        />
                        {loading ? <div className="flex justify-center  items-center max-md:h-[58px] md:w-[171px] bg-bgButton/40 rounded"><Loading color="#fff" /></div> : <Button title="Criar meu Bolão" typeB="PRIMARY" />}
                    </div>

                    <div className={`${code ? "h-[100px] max-md:h-[150px]" : "h-0"} overflow-hidden transition-all`}>
                        <p className="text-green-500 max-md:text-center max-md:w-[80%] max-md:m-auto max-md:mb-3">Seu Bolão foi Criado com Sucesso! Copie o codigo abaixo.</p>
                        <div className="border border-borderCopa p-2 text-xl text-white rounded w-[200px] max-md:m-auto text-center flex justify-around items-center hover:bg-green-500/20 hover:border-green-900" onClick={() => { codeIsLoading() }}>
                            {isCodeLoading ? <span className="text-sm font-light">Copiado</span> : <span>{code}</span>}
                            <Clipboard size={32} />
                        </div>
                    </div>
                    <p className={`text-textGrayDark text-sm text-center w-[70%] m-auto ${code && "hidden"}`}>
                        Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
                    </p>
                </div>
            ) : (
                <>
                    {isLoading ? <div className="flex justify-center w-full  h-[58px] items-center rounded bg-bgRed/40"><Loading color="#fff" /></div> : <Button title=" Fazer Login com Google" typeB="SECONDARY" onClick={login} />}
                    <p className="text-textGrayDark text-sm text-center w-[70%] m-auto">
                        Não utilizamos nenhuma informação além do seu e-mail para criação de sua conta.
                    </p>
                </>
            )}
        </form>
    )
}

