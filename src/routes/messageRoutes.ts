import {
    getPaginatedMessagesSchema,
    getThreadedMessagesSchema
} from './routeSchemas'
import {
    getPaginatedMessages,
    getThreadedMessages
} from '../handlers/messageHandlers'

export default async function (fastify: any, options: object) {
    fastify.route({
        method: 'POST',
        url: '/get/all/',
        schema: getPaginatedMessagesSchema,
        // This will attach request validation errors to Fastify req object so that it can be handeled properly
        attachValidation: true,
        handler: getPaginatedMessages(fastify)
    })

    fastify.route({
        method: 'POST',
        url: '/get/thread/',
        schema: getThreadedMessagesSchema,
        attachValidation: true,
        handler: getThreadedMessages(fastify)
    })

}