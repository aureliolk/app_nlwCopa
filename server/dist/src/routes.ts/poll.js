"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollsRoute = void 0;
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const authentication_1 = require("../plugins/authentication");
const PollsRoute = async (fastify) => {
    fastify.post("/polls", async (req, res) => {
        const createPollBody = zod_1.z.object({
            title: zod_1.z.string()
        });
        const { title } = createPollBody.parse(req.body);
        const generate = new short_unique_id_1.default({
            length: 6
        });
        const code = String(generate()).toUpperCase();
        try {
            await req.jwtVerify();
            await prisma_1.prisma.poll.create({
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
            });
        }
        catch (error) {
            await prisma_1.prisma.poll.create({
                data: {
                    title,
                    code: String(generate()).toUpperCase(),
                }
            });
        }
        return res.status(201).send({ code });
    });
    fastify.post("/polls/join", { onRequest: [authentication_1.authentication] }, async (req, res) => {
        const joinPollBody = zod_1.z.object({
            code: zod_1.z.string()
        });
        const { code } = joinPollBody.parse(req.body);
        const poll = await prisma_1.prisma.poll.findUnique({
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
        });
        if (!poll) {
            return res.status(400).send({
                msg: "Bolão não encontrado"
            });
        }
        if (poll.participant.length > 0) {
            return res.status(201).send({
                msg: "Seu Bolão foi encontrado"
            });
        }
        await prisma_1.prisma.participants.create({
            data: {
                pollId: poll.id,
                userId: req.user.sub
            }
        });
        return res.status(201).send();
    });
    fastify.get("/poll/count", async () => {
        const count = await prisma_1.prisma.poll.count();
        return { count };
    });
    fastify.get("/polls", { onRequest: [authentication_1.authentication] }, async (req) => {
        const polls = await prisma_1.prisma.poll.findMany({
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
        });
        return { polls };
    });
    fastify.get("/polls/:id", { onRequest: [authentication_1.authentication] }, async (req) => {
        const getPollParams = zod_1.z.object({
            id: zod_1.z.string()
        });
        const { id } = getPollParams.parse(req.params);
        const poll = await prisma_1.prisma.poll.findUnique({
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
        });
        return { poll };
    });
};
exports.PollsRoute = PollsRoute;
