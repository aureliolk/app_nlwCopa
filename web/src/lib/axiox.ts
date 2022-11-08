import axios from "axios"

export const api = axios.create({
    baseURL: "https://api-acos.vercel.app",
})

// baseURL: "http://localhost:3333",
