"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_1 = __importDefault(require("fastify"));
const auth_1 = require("./routes.ts/auth");
const game_1 = require("./routes.ts/game");
const guesses_1 = require("./routes.ts/guesses");
const poll_1 = require("./routes.ts/poll");
const user_1 = require("./routes.ts/user");
const Server = async () => {
    const fastify = (0, fastify_1.default)({
        logger: true
    });
    await fastify.register(cors_1.default, {
        origin: true
    });
    await fastify.register(poll_1.PollsRoute);
    await fastify.register(user_1.UserRoute);
    await fastify.register(guesses_1.GuessesRoute);
    await fastify.register(game_1.GamesRoute);
    await fastify.register(auth_1.AuthRoute);
    fastify.get("/", () => {
        return "You is Developer";
    });
    /** Setup Listing Port **/
    fastify.listen({
        port: 3333,
        // host:"0.0.0.0"
    }, (err) => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    });
};
Server();
