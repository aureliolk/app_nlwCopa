import { FastifyInstance } from "fastify"
import ShortUniqueId from "short-unique-id"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { authentication } from "../plugins/authentication"



export const PollsRoute = async (fastify: FastifyInstance) => {

    fastify.post("/polls", async (req, res) => {
        const createPollBody = z.object({
            title: z.string()
        })
        const { title } = createPollBody.parse(req.body)
        const generate = new ShortUniqueId({
            length: 6
        })

        const code = String(generate()).toUpperCase()

        try {
            await req.jwtVerify()

            await prisma.poll.create({
                data: {
                    title,
                    code,
                    ownerId: req.user.sub,

                    participant: {
                        create: {
                            userId: req.user.sub
                        }
                    }
                }
            })
        } catch (error) {
            await prisma.poll.create({
                data: {
                    title,
                    code: String(generate()).toUpperCase(),
                }
            })
        }

        return res.status(201).send({ code })
    })

    fastify.post("/polls/join", { onRequest: [authentication] }, async (req, res) => {
        const joinPollBody = z.object({
            code: z.string()
        })

        const { code } = joinPollBody.parse(req.body)

        const poll = await prisma.poll.findUnique({
            where: {
                code
            },
            include: {
                participant: {
                    where: {
                        userId: req.user.sub
                    }
                }
            }
        })

        if (!poll) {
            return res.status(400).send({
                msg: "Bolão não encontrado"
            })
        }

        if (poll.participant.length > 0) {
            return res.status(201).send({
                msg: "Seu Bolão foi encontrado"
            })
        }

        await prisma.participants.create({
            data: {
                pollId: poll.id,
                userId: req.user.sub
            }
        })

        return res.status(201).send()
    })


    fastify.get("/poll/count", async () => {
        const count = await prisma.poll.count()
        return { count }
    })

    fastify.get("/polls", { onRequest: [authentication] }, async (req) => {
        const polls = await prisma.poll.findMany({
            where: {
                participant: {
                    some: {
                        userId: req.user.sub
                    }
                }
            },
            include: {
                _count: {
                    select: {
                        participant: true
                    }
                },
                participant: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                avatarUrl: true
                            }
                        }
                    },
                    take: 4,
                },
                owner: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        })

        return { polls }

    })

    fastify.get("/polls/:id", { onRequest: [authentication] }, async (req) => {
        const getPollParams = z.object({
            id: z.string()
        })

        const { id } = getPollParams.parse(req.params)

        const poll = await prisma.poll.findUnique({
            where: {
                id
            },
            include: {
                _count: {
                    select: {
                        participant: true
                    }
                },
                participant: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                avatarUrl: true
                            }
                        }
                    },
                    take: 4,
                },
                owner: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        })

        return { poll }
    })



}


