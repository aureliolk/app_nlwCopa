"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const AuthRoute = async (fastify) => {
    fastify.get("/auth", async () => {
        return "auth";
    });
};
exports.AuthRoute = AuthRoute;
