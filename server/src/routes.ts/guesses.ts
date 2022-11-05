import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export const GuessesRoute = async (fastify: FastifyInstance) => {
    fastify.get("/guesses/count", async () => {
        const count = await prisma.gess.count()
        return { count }
    })
}