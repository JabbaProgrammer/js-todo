const { Task } = require("../../models");



const createTask = async(req, res) => {
    try{
        const response = await Task.create({
            name: req.body.name,
            description: req.body.description,
            user_id: req.body.user_id,
        });
        res.send({name: req.body.name, description: req.body.description, id: response.dataValues.id, complete: response.dataValues.complete})
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = createTask