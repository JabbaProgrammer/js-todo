const { Task } = require("../../models");

const listTasks = async(req, res) => {
    try{
        const data = await Task.findAll({
            where:{user_id: req.query.user_id},
            attributes:['name', 'description', 'complete', 'id']
        });
        res.send(data);
    }
    catch(error) {
        res.status(400).send(error.message);
    }
}

module.exports = listTasks