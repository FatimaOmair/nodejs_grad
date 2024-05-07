import joi from "joi";

export const sendMessageSchema = {
    body: joi.object({
        content: joi.string().max(100),
    }),
    query: joi.object({
        sectionId: joi.string().length(24)
    })
}

export const getMessagesSchema = {
    query: joi.object({
        sectionId: joi.string().length(24),
        page: joi.number().min(1),
        perPage: joi.number().min(3).max(20)
    })
}

export const sectionDetailsSchema = {
    query: joi.object({
        sectionId: joi.string().length(24)
    })
}