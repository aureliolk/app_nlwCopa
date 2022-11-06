import { FastifyRequest } from "fastify";

export const authentication = async (req: FastifyRequest) => {
    await req.jwtVerify()
}

