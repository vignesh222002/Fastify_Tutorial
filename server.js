import Fastify from "fastify";
import fastifyMysql from "@fastify/mysql";
import grettingsController from "./src/controller/greetingsController.js";
import personsController from "./src/controller/personsController.js";

const PORT = 4000

const fastify = Fastify({
    logger: true
});

// Database Access

fastify.register(fastifyMysql, {
    host: 'localhost',
    user: 'root',
    password: 'Root@1234',
    database: 'practice',
    promise: true
})

// Routes

fastify.route({
    method: "GET",
    url: '/hello/:name',
    handler: (req, res) => {
        return {
            message: `Hello ${req.params.name}`
        }
    }
})

// Hook

fastify.addHook('onRequest', (req, res, next) => {
    console.log("----------Request Received----------")
    next();
})

// Controllers

fastify.register(grettingsController, { prefix: '/greetings' })
fastify.register(personsController, { prefix: '/persons' })

try {
    fastify.listen({ port: PORT })
}
catch (error) {
    fastify.log.error(error)
    process.exit(1)
}