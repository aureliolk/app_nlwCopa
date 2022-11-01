import cors from "@fastify/cors";
import { PrismaClient } from '@prisma/client';
import Fastify from "fastify";

const prisma = new PrismaClient({
    log:["query"]
})

const Server = async () => {
    const fastify = Fastify({
        logger:true
    })
    
    await fastify.register(cors,{
        origin:true
    })

    fastify.get("/pools/count",async ()=>{
        const count =  await prisma.pool.count()
        return {count}
    })

    type PoolProps = {
        id: String
        code: String
    }

    fastify.post("/pools/add", (req,res)=>{
        console.log(req.body) 

        // @ts-ignore
        const {id,code}:PoolProps = req.body

        return {id,code}
    })

    fastify.listen({
        port:3333,
        host:"0.0.0.0"
    },(err)=>{
        if(err){
            fastify.log.error(err)
            process.exit(1)
        }

    })
}

Server()