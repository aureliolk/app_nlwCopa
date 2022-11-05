import { FastifyInstance } from "fastify";

export const AuthRoute = async (fastify: FastifyInstance) => {
    fastify.get("/user", async () => {
        return "user"
    })
}