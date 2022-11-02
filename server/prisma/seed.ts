import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const Main = async ()=>{
    const user = await prisma.user.create({
        data:{
            name:"Jhon Doe",
            email:"jhondoe@gmail.com",
            avatarUrl:"https://github.com/aureliolk.png",
        }
    })

    const pool =  await prisma.pool.create({
        data:{
            title: "Pool Jhon Doe",
            code:"POOL123",
            ownerId: user.id,
            
            participant:{
                create:{
                    userId:user.id
                }
            }
        }
    })

    await prisma.game.create({
        data:{
            date:'2022-11-02T01:29:03.466Z',
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "DE",
        }
    })

    await prisma.game.create({
        data:{
            date:'2022-11-03T01:29:03.466Z',
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "AR",

            guesses:{
                create:{
                    firsTeamPoints:2,
                    secondTeamPoints:1,

                    participant:{
                        connect:{
                            userId_poolId:{
                                userId:user.id,
                                poolId:pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}


Main()