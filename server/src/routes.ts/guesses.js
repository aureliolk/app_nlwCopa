"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuessesRoute = void 0;
const prisma_1 = require("../lib/prisma");
const GuessesRoute = async (fastify) => {
    fastify.get("/guesses/count", async () => {
        const count = await prisma_1.prisma.gess.count();
        return { count };
    });
};
exports.GuessesRoute = GuessesRoute;
