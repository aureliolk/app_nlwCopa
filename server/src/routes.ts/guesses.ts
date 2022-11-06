import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authentication } from "../plugins/authentication";

export const GuessesRoute = async (fastify: FastifyInstance) => {
    fastify.get("/guesses/count", async () => {
        const count = await prisma.guess.count()
        return { count }
    })

    fastify.post("/poll/:pollId/games/:gameId/guesses", { onRequest: [authentication] }, async (req, res) => {
        const createGuessesParams = z.object({
            pollId: z.string(),
            gameId: z.string()
        })

        const { gameId, pollId } = createGuessesParams.parse(req.params)


        const createGuessesBody = z.object({
            firstTeamPoints: z.number(),
            secondTeamPoints: z.number()
        })

        const { firstTeamPoints, secondTeamPoints } = createGuessesBody.parse(req.body)

        const participant = await prisma.participants.findUnique({
            where: {
                userId_pollId: {
                    pollId,
                    userId: req.user.sub
                }
            }
        })

        if (!participant) {
            return res.status(400).send({
                msg: "Vou não pertence a esse jogo !!"
            })
        }

        const guess = await prisma.guess.findUnique({
            where: {
                participantsId_gameId: {
                    participantsId: participant.id,
                    gameId
                }
            }
        })

        if (guess) {
            return res.status(400).send({
                msg: "Voce ja enviou um palpite para esse bolão"
            })
        }

        const game = await prisma.game.findUnique({
            where: {
                id: gameId
            }
        })

        if (!game) {
            return res.status(400).send({
                msg: "Jogo não encontrado"
            })
        }

        if (game.date < new Date()) {
            return res.status(400).send({
                msg: "Você não pode enviar um palpite depois da data do jogo"
            })
        }


        await prisma.guess.create({
            data: {
                gameId,
                participantsId: participant.id,
                firstTeamPoints,
                secondTeamPoints
            }
        })

        return res.status(201).send({
            msg: "Seu palpite foi criado com Sucesso! Boa sorte ..."
        })
    })
}