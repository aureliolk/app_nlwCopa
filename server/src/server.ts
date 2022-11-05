import cors from "@fastify/cors";
import Fastify from "fastify";


const Server = async () => {
    const fastify = Fastify({
        logger: true
    })
    await fastify.register(cors, {
        origin: true
    })




    /** Users**/


    /** Guesses **/



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