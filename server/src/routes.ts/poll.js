"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollsRoute = void 0;
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const PollsRoute = async (fastify) => {
    fastify.get("/poll/count", async () => {
        const count = await prisma_1.prisma.poll.count();
        return { count };
    });
    fastify.get("/poll/list", async () => {
        const list = await prisma_1.prisma.poll.findMany();
        return list;
    });
    fastify.post("/poll/add", async (req, res) => {
        const createPollBody = zod_1.z.object({
            title: zod_1.z.string()
        });
        const { title } = createPollBody.parse(req.body);
        const generate = new short_unique_id_1.default({
            length: 6
        });
        const createPoll = await prisma_1.prisma.poll.create({
            data: {
                title,
                code: String(generate()).toUpperCase()
            },
            select: {
                code: true
            }
        });
        return createPoll;
    });
};
exports.PollsRoute = PollsRoute;
