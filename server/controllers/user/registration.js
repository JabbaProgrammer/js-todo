const joi = require("joi");
const { userRegistration } = require("../../service/user.service");
const { wrap } = require("../../wrappers");

const registrationSchema = joi.object({
    reqQuery: joi.object().length(0),
    reqBody: joi.object({
        email: joi.string().email().lowercase().required(),
        password: joi.string().min(8).required(),
    })
})

const registration = async(req, res, next) => {
    try {
        //const validate = await registrationSchema.validateAsync(req.body)
        const UserData = await userRegistration(req.body.email, req.body.password);
        return res.send(UserData);
    } catch(error) {
        res.status(400).send(error.message)
    }
}

module.exports = wrap(registration, {
    validate: registrationSchema
});