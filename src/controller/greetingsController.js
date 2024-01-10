const responseShema = {
    querystring: {
        properties: {
            lastName: { type: 'string' }
        },
        required: ['lastName']
    },
    params: {
        properties: {
            name: { type: 'string' }
        },
        required: ['name']
    },
    response: {
        200: {
            properties: {
                message: { type: 'string' }
            },
            required: ['message']
        }
    }
}

const grettingsController = (fastify, options, done) => {

    fastify.get('/', (req, res) => {
        return {
            message: "Hello World!"
        }
    })

    fastify.get('/:name', { schema: responseShema }, (req, res) => {
        return {
            message: `Hello ${req.params.name} ${req.query.lastName}`
        }
    })

    done();
}

export default grettingsController;