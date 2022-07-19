const joi = require("joi");
const { userLogin } = require("../../service/user.service");
const { wrap } = require("../../wrappers");

const loginSchema = joi.object({
    reqQuery: joi.object().length(0),
    reqBody: joi.object({
        email: joi.string().email().lowercase().required(),
        password: joi.string().min(8).required(),
    })
})

const login = async(req, res, next) => {
    try {
        //const validated = await loginSchema.validateAsync(req.body);
        const userData = await userLogin(req.body.email, req.body.password);
        res.status(200).send(userData);
    } catch(error) {
        res.status(400).send(error.message)
    }
}

// export default wrap(completeTask, {
//     validate: completeTaskSchema
// })

module.exports = wrap(login, {
    validate: loginSchema
});