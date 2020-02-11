import { ROLES } from '../services/roles'

export const userCreateSchema = {
    body: {
        type: 'object',
        required: ['username', 'tempPassword', 'firstname', 'lastname', 'role'],
        properties: {
            username: { type: 'string' },
            tempPassword: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            role: {
                type: 'string',
                enum: [ROLES.ADMIN, ROLES.USER]
            }
        },
        additionalProperties: true
    },
    response: {
        200: {
            type: 'object',
            required: ['userId'],
            properties: {
                address: { type: 'string' },
                tempPass: { type: 'string' }
            },
            additionalProperties: false
        }
    }
}