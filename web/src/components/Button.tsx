import { GoogleLogo } from "phosphor-react"
import { MouseEventHandler } from "react";

interface ButtonProps {
    title: string
    typeB: string
    onClick?: () => void;

}

const Button = ({ title, typeB, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            type={typeB === "PRIMARY" ? "button" : "submit"}
            className={`${typeB === "PRIMARY" ? "bg-bgButton w-[171px] hover:bg-bgButton/90" : "bg-bgRed w-full flex items-center gap-2 justify-center hover:bg-bgRed/90"} text-white py-4 px-6  h-[58px] rounded text-sm font-bold text-center `}
        >{typeB === "SECONDARY" && <GoogleLogo size={32} />} {title}</button>
    )
}

export default Button



// if (type === "PRIMARY") {
//     return (
//         <button
//             className="bg-bgButton text-white py-4 px-6 w-[171px] h-[58px] rounded text-sm font-bold text-center hover:bg-bgButton/90"
//         >{title}</button>
//     )
// } else if (type === "SECONDARY") {
//     return (
//         <button
//             className="bg-bgRed text-white py-4 px-6 w-[171px] h-[58px] rounded text-sm font-bold text-center hover:bg-bgRed/90"
//         >{title}</button>
//     )
// }