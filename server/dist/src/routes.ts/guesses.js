"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuessesRoute = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const authentication_1 = require("../plugins/authentication");
const GuessesRoute = async (fastify) => {
    fastify.get("/guesses/count", async () => {
        const count = await prisma_1.prisma.guess.count();
        return { count };
    });
    fastify.post("/poll/:pollId/games/:gameId/guesses", { onRequest: [authentication_1.authentication] }, async (req, res) => {
        const createGuessesParams = zod_1.z.object({
            pollId: zod_1.z.string(),
            gameId: zod_1.z.string()
        });
        const { gameId, pollId } = createGuessesParams.parse(req.params);
        const createGuessesBody = zod_1.z.object({
            firstTeamPoints: zod_1.z.number(),
            secondTeamPoints: zod_1.z.number()
        });
        const { firstTeamPoints, secondTeamPoints } = createGuessesBody.parse(req.body);
        const participant = await prisma_1.prisma.participants.findUnique({
            where: {
                userId_pollId: {
                    pollId,
                    userId: req.user.sub
                }
            }
        });
        if (!participant) {
            return res.status(400).send({
                msg: "Vou não pertence a esse jogo !!"
            });
        }
        const guess = await prisma_1.prisma.guess.findUnique({
            where: {
                participantsId_gameId: {
                    participantsId: participant.id,
                    gameId
                }
            }
        });
        if (guess) {
            return res.status(400).send({
                msg: "Voce ja enviou um palpite para esse bolão"
            });
        }
        const game = await prisma_1.prisma.game.findUnique({
            where: {
                id: gameId
            }
        });
        if (!game) {
            return res.status(400).send({
                msg: "Jogo não encontrado"
            });
        }
        if (game.date < new Date()) {
            return res.status(400).send({
                msg: "Você não pode enviar um palpite depois da data do jogo"
            });
        }
        await prisma_1.prisma.guess.create({
            data: {
                gameId,
                participantsId: participant.id,
                firstTeamPoints,
                secondTeamPoints
            }
        });
        return res.status(201).send({
            msg: "Seu palpite foi criado com Sucesso! Boa sorte ..."
        });
    });
};
exports.GuessesRoute = GuessesRoute;
