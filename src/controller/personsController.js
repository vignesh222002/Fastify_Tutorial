const responseSchema = {
    response: {
        200: {
            persons: { type: 'array' }
        }
    }
}

const postPersonSchema = {
    body: {
        properties: {
            person: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    age: { type: 'number' }
                },
                required: ['name', 'age']
            }
        },
        required: ['person']
    },
    response: {
        200: {
            status: { type: 'boolean' }
        }
    }
}

const postMultiplePersonsSchema = {
    body: {
        properties: {
            persons: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        age: { type: 'number' }
                    },
                    required: ['name', 'age']
                }
            }
        },
        required: ['persons']
    },
    response: {
        200: {
            status: { type: 'boolean' }
        }
    }
}

const personsController = (fastify, options, done) => {
    fastify.get('/', { scheme: responseSchema }, async (req, res) => {
        try {
            const [persons] = await fastify.mysql.execute('select * from persons');
            return { persons }
        } catch (error) {
            return error;
        }
    })

    fastify.post('/', { schema: postPersonSchema }, async (req, res) => {
        try {
            const { name, age } = req.body.person;
            console.log("persons", name, age);
            await fastify.mysql.execute(`
                insert into persons (name, age)
                values ('${name}', ${age})
            `)
            return { status: true }
        } catch (error) {
            console.log("Post Error :", error)
            return error;
        }
    })

    done();
}

export default personsController;