"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesRoute = void 0;
const GamesRoute = async (fastify) => {
    fastify.get("/games", async () => {
        return "games";
    });
};
exports.GamesRoute = GamesRoute;
