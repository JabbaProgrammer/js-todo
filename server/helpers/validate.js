const joi = require('joi')

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
    taskSchema,
    completeTaskReq,
    listTasksReq
}