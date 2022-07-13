const joi = require('joi')

const loginSchema = joi.object({
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(8).required(),
})

const registrationSchema = loginSchema;

const taskSchema = joi.object({
    name: joi.string().required().min(3).max(20),
    description: joi.string().required().max(100),
    user_id: joi.string().uuid().required()
})

const completeTaskReq = joi.object({
    id: joi.string().uuid().required()
})

const listTasksReq = joi.object({
    user_id: joi.string().uuid().required()    
})

module.exports = {
    registrationSchema,
    loginSchema,
    taskSchema,
    completeTaskReq,
    listTasksReq
}