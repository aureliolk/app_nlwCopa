import { Html, Head, Main, NextScript } from "next/document"
import Header from "../components/Header"

export default function Document() {
    return (
        <Html>
            <Head>
                <title>App Bolão da Copa</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link href="https://fonts.googleapis.com/css2?family=Poor+Story&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <body className="bg-bgCopa flex flex-col justify-center items-center h-screen bg-bgCopaImg bg-center bg-no-repeat bg-cover" >
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}