"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const prisma_1 = require("../lib/prisma");
const UserRoute = async (fastify) => {
    fastify.get("/users/count", async () => {
        const count = await prisma_1.prisma.user.count();
        return { count };
    });
};
exports.UserRoute = UserRoute;
