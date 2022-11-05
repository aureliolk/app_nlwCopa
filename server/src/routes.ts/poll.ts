import { FastifyInstance } from "fastify"
import ShortUniqueId from "short-unique-id"
import { z } from "zod"
import { prisma } from "../lib/prisma"



export const PoolsRoute = async (fastify: FastifyInstance) => {
    fastify.get("/poll/count", async () => {
        const count = await prisma.poll.count()
        return { count }
    })

    fastify.get("/polls/list", async () => {
        const list = await prisma.poll.findMany()
        return list
    })

    fastify.post("/poll/add", async (req, res) => {
        const createPollBody = z.object({
            title: z.string()
        })
        const { title } = createPollBody.parse(req.body)
        const generate = new ShortUniqueId({
            length: 6
        })
        const createPoll = await prisma.poll.create({
            data: {
                title,
                code: String(generate()).toUpperCase()
            },
            select: {
                code: true
            }
        })
        return createPoll
    })
}


