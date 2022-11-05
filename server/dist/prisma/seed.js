"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Main = async () => {
    const user = await prisma.user.create({
        data: {
            name: "Jhon Doe",
            email: "jhondoe@gmail.com",
            avatarUrl: "https://github.com/aureliolk.png",
        }
    });
    const pool = await prisma.poll.create({
        data: {
            title: "Pool Jhon Doe",
            code: "POOL123",
            ownerId: user.id,
            participant: {
                create: {
                    userId: user.id
                }
            }
        }
    });
    await prisma.game.create({
        data: {
            date: '2022-11-02T01:29:03.466Z',
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "DE",
        }
    });
    await prisma.game.create({
        data: {
            date: '2022-11-03T01:29:03.466Z',
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "AR",
            guesses: {
                create: {
                    firsTeamPoints: 2,
                    secondTeamPoints: 1,
                    participant: {
                        connect: {
                            userId_pollId: {
                                userId: user.id,
                                pollId: pool.id
                            }
                        }
                    }
                }
            }
        }
    });
};
Main();
