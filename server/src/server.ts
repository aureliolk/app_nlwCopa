import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import Fastify from "fastify";
import { env } from "node:process";
import { AuthRoute } from "./routes.ts/auth";
import { GamesRoute } from "./routes.ts/game";
import { GuessesRoute } from "./routes.ts/guesses";
import { PollsRoute } from "./routes.ts/poll";
import { UserRoute } from "./routes.ts/user";


const Server = async () => {
    const fastify = Fastify({
        logger: true
    })
    await fastify.register(cors, {
        origin: true
    })

    await fastify.register(jwt, {
        secret: `${process.env.SECRET_TOKEN}`
    })
    await fastify.register(PollsRoute)
    await fastify.register(UserRoute)
    await fastify.register(GuessesRoute)
    await fastify.register(GamesRoute)
    await fastify.register(AuthRoute)

    fastify.get("/", () => {
        return "You is Developer"
    })


    /** Setup Listing Port **/
    fastify.listen({
        port: 3333,
        // host:"0.0.0.0"
    }, (err) => {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }

    })
}

Server()