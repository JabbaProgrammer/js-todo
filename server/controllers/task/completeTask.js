const { wrap } = require("../../wrappers");

const joi = require("joi");
const { Task, db } = require("../../models");

const completeTaskSchema = joi.object({
    reqQuery: joi.object({
        id: joi.string().uuid().optional(),
    }),
    reqBody: joi.object().length(0),
})

const completeTask = async(req, res) => {
    try{
        const [data, newValue] = await Task.update(
            { complete: db.sequelize.literal('not tasks.complete') },
            { where: { id: req.query.id },
            returning: true
        })
        res.send({id: req.query.id, complete: newValue[0].dataValues.complete});
    }
    catch(error){
        res.status(400).send(error.message);
    }
    
}

// export default wrap(completeTask, {
//     validate: completeTaskSchema
// })

module.exports = completeTask