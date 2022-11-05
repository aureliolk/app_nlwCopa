import { FastifyInstance } from "fastify";

export const AuthRoute = async (fastify: FastifyInstance) => {
    fastify.get("/auth", async () => {
        return "auth"
    })
}