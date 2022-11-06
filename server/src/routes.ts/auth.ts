
import axios from "axios";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authentication } from "../plugins/authentication";


export const AuthRoute = async (fastify: FastifyInstance) => {

    fastify.get("/me", { onRequest: [authentication] }, async (req) => {
        return { user: req.user }
    })

    fastify.post("/users", async (req) => {
        const createUser = z.object({
            access_token: z.string()
        })

        const { access_token } = createUser.parse(req.body)


        const userData = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })

        const userInfoSchema = z.object({
            id: z.string(),
            email: z.string().email(),
            name: z.string(),
            picture: z.string().url()
        })

        const userInfo = userInfoSchema.parse(userData)

        let user = await prisma.user.findUnique({
            where: {
                googleId: userInfo.id
            }
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    googleId: userInfo.id,
                    name: userInfo.name,
                    email: userInfo.email,
                    avatarUrl: userInfo.picture
                }
            })
        }

        const token = fastify.jwt.sign({
            name: user.name,
            avatar: user.avatarUrl
        }, {
            sub: user.id,
            expiresIn: "1 days"
        })

        return token
    })

}