import { ROLES } from '../services/roles'

export const userCreateSchema = {
    body: {
        type: 'object',
        required: ['username', 'tempPassword', 'firstname', 'lastname', 'role'],
        properties: {
            username: { type: 'string', minLength: 4 },
            tempPassword: { type: 'string', minLength: 8 },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            role: {
                type: 'string',
                enum: [ROLES.ADMIN, ROLES.USER]
            }
        },
        additionalProperties: false
    },
    response: {
        200: {
            type: 'object',
            properties: {
                address: { type: 'string' },
                tempPass: { type: 'string' }
            },
            additionalProperties: false
        }
    }
}

export const getAllMailboxSchema = {
    body: {
        type: 'object',
        required: [],
        properties: {
            //This is the optional address id, if not given then defaults to user's primary addresss
            id: { type: 'string', minLength: 24, maxLength: 24 }
        },
        additionalProperties: false
    },
    response: {
        200: {
            type: 'object',
            properties: {
                mailboxes: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            total: { type: 'number' },
                            unseen: { type: 'number' },
                            size: { type: 'number' },
                        }
                    }
                }
            },
            additionalProperties: false
        }
    }
}

export const getPaginatedMessagesSchema = {
    body: {
        type: 'object',
        required: ['id'],
        properties: {
            //This is the optional address id, if not given then defaults to user's primary addresss
            addressId: { type: 'string', minLength: 24, maxLength: 24 },// Using mongo ObjectId type that has 12 bytes, 24 char string in Hex 
            // Mailbox Id
            id: { type: 'string', minLength: 24, maxLength: 24 },
            limit: { type: 'number', maximum: 50 }, // Defaults to 20
            next: { type: 'string' },
            previous: { type: 'string' },
            ascending: { type: 'boolean' }
        },
        additionalProperties: false
    },
    response: {
        200: {
            type: 'object',
            properties: {
                results: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            a: { type: 'string' },
                            _id: { type: 'string' },
                            body: { type: 'object', additionalProperties: true },
                            from: { type: 'array', items: { type: 'string' } },
                            to: { type: 'array', items: { type: 'string' } },
                            cc: { type: 'array', items: { type: 'string' } },
                            bcc: { type: 'array', items: { type: 'string' } },
                            idate: { type: 'number' },
                            parsedHeaders: { type: 'object', additionalProperties: true },
                            messageId: { type: 'string' },
                            attachments: { type: 'array', items: { type: 'object', additionalProperties: true } },
                        }
                    }
                },
                next: { type: 'string' },
                hasNext: { type: 'string' },
                previous: { type: 'string' },
                hasPrevious: { type: 'string' },
            },
            additionalProperties: false
        }
    }
}

export const getThreadedMessagesSchema = {
    body: {
        type: 'object',
        required: ['id'],
        properties: {
            addressId: { type: 'string', minLength: 24, maxLength: 24 },
            // Thread id
            id: { type: 'string', minLength: 24, maxLength: 24 },
        },
        additionalProperties: false
    },
    response: {
        200: {
            type: 'object',
            properties: {
                messages: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            body: { type: 'object', additionalProperties: true },
                            from: { type: 'array', items: { type: 'string' } },
                            to: { type: 'array', items: { type: 'string' } },
                            cc: { type: 'array', items: { type: 'string' } },
                            bcc: { type: 'array', items: { type: 'string' } },
                            idate: { type: 'number' },
                            parsedHeaders: { type: 'object', additionalProperties: true },
                            messageId: { type: 'string' },
                            attachments: { type: 'array', items: { type: 'object', additionalProperties: true } },
                            hasAttachments: { type: 'boolean' },
                            flags: { type: 'object', additionalProperties: true },
                            thread: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
}