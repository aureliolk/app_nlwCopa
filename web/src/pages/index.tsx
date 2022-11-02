import Image from "next/image"
import logo from "../assets/logo.svg"
import userAvatar from "../assets/avatares.png"
import iconCheck from "../assets/icon.svg"
import imagePhone from "../assets/img-phone.png"
import { api } from "../lib/axiox"
import { FormEvent, useState } from "react"




interface Props {
  poolCount: number,
  guessesCount: number,
  userCount: number
}


export default function Home({ guessesCount, poolCount, userCount }: Props) {
  const [namePool, setNamePool] = useState("")

  const createPool = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await api.post("/pools/add", {
        title: namePool
      })
      const { code } = res.data
      console.log(code)
      await navigator.clipboard.writeText(code)
      alert(`Seu Bolão ${code}, foi criado com Sucesso.`)
      setNamePool("")

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="flex max-w-[1024px] justify-evenly max-h-[577px] m-auto">
      <div className="flex flex-col justify-between w-[525px] ">
        <Image src={logo} alt="" quality={100} />
        <h1 className="text-5xl font-bold leading-[125%] text-white">Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
        <div className="flex items-center text-white">
          <Image src={userAvatar} alt="" quality={100} />
          <strong className="text-xl leading-[160%] text-textGray font-bold"><span className="text-textGreen">+{userCount}</span> pessoas já estão usando</strong>
        </div>
        <form className="flex gap-1" onSubmit={createPool}>
          <input
            className="w-[306px] py-4 px-6 h-[58px] bg-[#202024] border-borderCopa rounded text-sm text-textGrayDark"
            type="text"
            placeholder="Qual nome do seu bolão?"
            onChange={(e) => { setNamePool(e.target.value) }}
            value={namePool}
          />
          <button
            className="bg-bgButton py-4 px-6 w-[171px] h-[58px] rounded text-sm font-bold text-center hover:bg-bgButton/90"
          >Criar Meu Bolão</button>
        </form>
        <p
          className="text-textGrayDark text-sm leading-5 w-[400px]"
        >Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas</p>
        <div className="border-t border-borderCopa" />
        <div className="grid grid-cols-2 divide-x divide-borderCopa">
          <div className="flex items-center justify-center gap-5">
            <Image src={iconCheck} alt="" quality={100} />
            <div className="flex flex-col">
              <strong className="text-2xl text-textGray">+{poolCount}</strong>
              <span className="text-textGray">Bolões Criados</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-5">
            <Image src={iconCheck} alt="" quality={100} />
            <div className="flex flex-col">
              <strong className="text-2xl text-textGray">+{guessesCount}</strong>
              <span className="text-textGray">Palpites Enviados</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[518px]">
        <Image src={imagePhone} alt="Imagem do App" quality={100} />
      </div>
    </div>
  )
}


export const getServerSideProps = async () => {

  const [poolCountRes, guessCountRes, userCountRes] = await Promise.all([
    api.get("/pools/count"),
    api.get("/guesses/count"),
    api.get("/users/count")
  ])

  return {
    props: {
      poolCount: poolCountRes.data.count,
      guessesCount: guessCountRes.data.count,
      userCount: userCountRes.data.count,
    }
  }

}