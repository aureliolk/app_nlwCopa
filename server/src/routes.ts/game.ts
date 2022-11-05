import { FastifyInstance } from "fastify";

export const GamesRoute = async (fastify: FastifyInstance) => {
    fastify.get("/games", async () => {
        return "games"
    })
}