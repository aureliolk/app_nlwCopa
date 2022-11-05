import Image from "next/image"
import logo from "../assets/logo.svg"
import logoMobile from "../assets/logoMobile.svg"

import userAvatar from "../assets/avatares.png"
import iconCheck from "../assets/icon.svg"
import imagePhone from "../assets/img-phone.png"
import { api } from "../lib/axiox"
import { FormEvent, useContext, useEffect, useState } from "react"
import { AuthContext } from "../auth/AuthContext"
import Header from "../components/Header"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../auth/firebase"
import Button from "../components/Button"
import Loading from "../components/Loading"
import { FormCreatePool } from "../components/FormPool"
import { PlusCircle } from "phosphor-react"

interface Props {
  poolCount: number,
  guessesCount: number,
  userCount: number
}

export default function Home({ guessesCount, poolCount, userCount }: Props) {

  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 3000)

  // }, [])





  return (
    <>
      <Header />
      <div className="flex max-w-[1024px] justify-evenly max-h-[577px] m-auto max-md:hidden">
        <div className="flex flex-col justify-between w-[525px] ">
          <Image src={logo} alt="" quality={100} />
          <h1 className="text-5xl font-bold leading-[125%] text-white">Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
          <div className="flex items-center text-white">
            <Image src={userAvatar} alt="" quality={100} />
            <strong className="text-xl leading-[160%] text-textGray font-bold"><span className="text-textGreen">+{userCount}</span> pessoas já estão usando</strong>
          </div>
          <FormCreatePool />
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
      {loading ? (
        <div className="bg-bgCopaMobile w-full border h-screen bg-cover ">
          <div className="absolute top-[55%] left-[45%] md:hidden">
            <Loading color="#fff" size="50px" />
          </div>
        </div>
      ) : (
        <div className="bg-black w-full h-screen  justify-center flex flex-col gap-20 items-center py-10 px-5 md:hidden border">
          <Image src={logoMobile} alt="logo copa" quality={100} className="border w-[250px]" />
          <h1 className="text-white text-2xl text-center font-bold max-md:max-w-[500px]">
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>
          <FormCreatePool />
          <div className="w-full bg-borderCopa absolute bottom-0 p-5 flex text-white justify-around">
            <button className="flex gap-2 items-center"><PlusCircle size={25} /> Novo Bolão</button>
            <button className="flex gap-2 items-center"><PlusCircle size={25} /> Meus Bolões</button>
          </div>
        </div>
      )}

    </>

  )
}


// export const getServerSideProps = async () => {


//   const [poolCountRes, guessCountRes, userCountRes] = await Promise.all([
//     api.get("/pools/count"),
//     api.get("/guesses/count"),
//     api.get("/users/count")
//   ])

//   return {
//     props: {
//       poolCount: poolCountRes.data.count,
//       guessesCount: guessCountRes.data.count,
//       userCount: userCountRes.data.count,

//     }
//   }

// }