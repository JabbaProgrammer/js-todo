const { Task } = require("../../models");



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

module.exports = createTask