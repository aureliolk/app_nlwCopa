"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesRoute = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const authentication_1 = require("../plugins/authentication");
const GamesRoute = async (fastify) => {
    fastify.get("/poll/:id/games", { onRequest: [authentication_1.authentication] }, async (req) => {
        const getPollParams = zod_1.z.object({
            id: zod_1.z.string()
        });
        const { id } = getPollParams.parse(req.params);
        const games = await prisma_1.prisma.game.findMany({
            orderBy: {
                date: "desc"
            },
            include: {
                guesses: {
                    where: {
                        participant: {
                            userId: req.user.sub,
                            pollId: id
                        }
                    }
                }
            }
        });
        return {
            games: games.map(game => {
                return {
                    ...game,
                    guess: game.guesses.length > 0 ? game.guesses[0] : null,
                    guesses: undefined
                };
            })
        };
    });
};
exports.GamesRoute = GamesRoute;
