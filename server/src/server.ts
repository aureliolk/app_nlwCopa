import cors from "@fastify/cors";
import { PrismaClient } from '@prisma/client';
import Fastify from "fastify";
import { z } from "zod";
import ShortUniqueId from 'short-unique-id';

const prisma = new PrismaClient({
    log: ["query"]
})

const Server = async () => {
    const fastify = Fastify({
        logger: true
    })
    await fastify.register(cors, {
        origin: true
    })


    /** Pools **/
    fastify.get("/pools/count", async () => {
        const count = await prisma.pool.count()
        return { count }
    })
    fastify.get("/pools/list", async () => {
        const list = await prisma.pool.findMany()
        return list
    })
    fastify.post("/pools/add", async (req, res) => {
        const createPoolBody = z.object({
            title: z.string()
        })
        const { title } = createPoolBody.parse(req.body)
        const generate = new ShortUniqueId({
            length: 6
        })
        const createPool = await prisma.pool.create({
            data: {
                title,
                code: String(generate()).toUpperCase()
            },
            select: {
                code: true
            }
        })
        return createPool
    })

    /** Users**/
    fastify.get("/users/count", async () => {
        const count = await prisma.user.count()
        return { count }
    })

    /** Guesses **/
    fastify.get("/guesses/count", async () => {
        const count = await prisma.gess.count()
        return { count }
    })



    /** Setup Listing Port **/
    fastify.listen({
        port: 3333,
        // host:"0.0.0.0"
    }, (err) => {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }

    })
}

Server()