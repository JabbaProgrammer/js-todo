const { Task } = require("../../models");

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

module.exports = listTasks