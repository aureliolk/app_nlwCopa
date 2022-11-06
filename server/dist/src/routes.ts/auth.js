"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const authentication_1 = require("../plugins/authentication");
const AuthRoute = async (fastify) => {
    fastify.get("/me", { onRequest: [authentication_1.authentication] }, async (req) => {
        return { user: req.user };
    });
    fastify.post("/users", async (req) => {
        const createUser = zod_1.z.object({
            access_token: zod_1.z.string()
        });
        const { access_token } = createUser.parse(req.body);
        const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        const userData = await userResponse.json();
        const userInfoSchema = zod_1.z.object({
            id: zod_1.z.string(),
            email: zod_1.z.string().email(),
            name: zod_1.z.string(),
            picture: zod_1.z.string().url()
        });
        const userInfo = userInfoSchema.parse(userData);
        let user = await prisma_1.prisma.user.findUnique({
            where: {
                googleId: userInfo.id
            }
        });
        if (!user) {
            user = await prisma_1.prisma.user.create({
                data: {
                    googleId: userInfo.id,
                    name: userInfo.name,
                    email: userInfo.email,
                    avatarUrl: userInfo.picture
                }
            });
        }
        const token = fastify.jwt.sign({
            name: user.name,
            avatar: user.avatarUrl
        }, {
            sub: user.id,
            expiresIn: "1 days"
        });
        return token;
    });
};
exports.AuthRoute = AuthRoute;
