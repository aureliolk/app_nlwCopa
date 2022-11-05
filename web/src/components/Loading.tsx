import { Spinner } from "phosphor-react"

interface LoadingProps {
    color?: string
    size?: string
}

const Loading = ({ color, size }: LoadingProps) => {
    return (
        <Spinner className="animate-spin" size={size || "32px"} color={color} />
    )
}

export default Loading