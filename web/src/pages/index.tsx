import Image from "next/image"
import logo from "../assets/logo.svg"
import logoMobile from "../assets/logoMobile.svg"
import userAvatar from "../assets/avatares.png"
import iconCheck from "../assets/icon.svg"
import imagePhone from "../assets/img-phone.png"
import { api } from "../lib/axiox"
import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import { FormCreatePool } from "../components/FormPoll"
import { PlusCircle } from "phosphor-react"
import { GetServerSideProps } from 'next'
import Header from "../components/Header"

interface Props {
  poolCount: number,
  guessesCount: number,
  userCount: number
  auth: string
}

export default function Home({ guessesCount, poolCount, userCount, auth }: Props) {
  const [loading, setLoading] = useState(true)
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    setScreenWidth(window.screen.width)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <>
      <div className="bg-bgCopa flex-col justify-center items-center h-screen md:flex md:bg-bgCopaImg bg-center bg-no-repeat bg-cover">
        <Header auth={auth} />
        <div className={`${auth ? "flex max-w-[1200px] justify-evenly mx-auto max-md:hidden" : "flex max-w-[1200px] justify-evenly max-h-[577px] m-auto max-md:hidden"}`}>
          <div className={`${auth ? "flex flex-col justify-between w-[525px] mt-16" : "flex flex-col justify-between w-[525px]"}`}>
            <Image src={logo} alt="" quality={100} />
            <h1 className="text-5xl font-bold leading-[125%] text-white">Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
            <div className="flex items-center text-white">
              <Image src={userAvatar} alt="" quality={100} />
              <strong className="text-xl leading-[160%] text-textGray font-bold"><span className="text-textGreen">+{userCount}</span> pessoas já estão usando</strong>
            </div>
            <FormCreatePool auth={auth} />
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
        <div className="md:hidden">
          {loading ? (
            <div className="bg-bgCopaMobile w-full h-screen bg-cover ">
              <div className="absolute bottom-[40%] left-[45%] md:hidden">
                <Loading color="#fff" size="50px" />
              </div>
            </div>
          ) : (
            <div className="bg-black w-full h-screen  justify-center hidden flex-col gap-20 items-center py-10 px-5 max-md:flex">
              <Image src={logoMobile} alt="logo copa" quality={100} className="border w-[250px]" />
              <h1 className="text-white text-2xl text-center font-bold max-md:max-w-[500px]">
                Crie seu próprio bolão da copa e compartilhe entre amigos!
              </h1>
              <FormCreatePool auth={auth} />
              <div className="w-full bg-borderCopa absolute bottom-0 p-5 flex text-white justify-around">
                <button className="flex gap-2 items-center"><PlusCircle size={25} /> Novo Bolão</button>
                <button className="flex gap-2 items-center"><PlusCircle size={25} /> Meus Bolões</button>
              </div>
            </div>
          )}
        </div>


      </div>
    </>
  )
}


export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {

  const auth = ctx.req.cookies.access_token || null

  const [poolCountRes, guessCountRes, userCountRes] = await Promise.all([
    api.get("/poll/count"),
    api.get("/guesses/count"),
    api.get("/users/count"),
  ])


  return {
    props: {
      poolCount: poolCountRes.data.count,
      guessesCount: guessCountRes.data.count,
      userCount: userCountRes.data.count,
      auth
    }
  }

}