const Sequelize = require("sequelize");
const { taskSchema, completeTaskReq, listTasksReq } = require("../helpers/validate");
const {Task} = require("../models/index");

const sequelize = new Sequelize({
    dialect: 'postgres',
    logQueryParameters: true,
})

//GET request to get all tasks
const listTasks = async(req, res) => {
    try{
        const validate = await listTasksReq.validateAsync(req.query)
        console.log(validate.user_id)
        const data = await Task.findAll({
            where:{user_id: validate.user_id},
            attributes:['name', 'description', 'complete', 'id']
        });
        res.send(data);
    }
    catch(error) {
        res.status(400).send(error.message);
    }
}

//PATCH request to set task done/undone
const completeTask = async(req, res) => {
    try{
        const validate = await completeTaskReq.validateAsync(req.params);
        const [data, newValue] = await Task.update(
            { complete: sequelize.literal('not tasks.complete') },
            { where: { id: validate.id },
            returning: true    
        })
        res.send({id: validate.id, complete: newValue[0].dataValues.complete});
    }
    catch(error){
        res.status(400).send(error.message);
    }
    
}

//POST request to create new task
const createTask = async(req, res) => {
    try{
        const validate = await taskSchema.validateAsync(req.body)
        console.log(validate)
        const response = await Task.create({
            name: validate.name,
            description: validate.description,
            user_id: validate.user_id,
        });
        res.send({name: validate.name, description: validate.description, id: response.dataValues.id, complete: response.dataValues.complete})
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    listTasks,
    createTask,
    completeTask
};