import { Html, Head, Main, NextScript } from "next/document"
import Header from "../components/Header"

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Poor+Story&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <body className="bg-bgCopa flex-col justify-center items-center h-screen md:flex md:bg-bgCopaImg bg-center bg-no-repeat bg-cover" >
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}