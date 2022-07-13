const { loginSchema, registrationSchema } = require("../helpers/validate");
const {userRegistration, userLogin} = require("../service/user.service");

const registration = async(req, res, next) => {
    try {
        const validate = await registrationSchema.validateAsync(req.body)

        const UserData = await userRegistration(validate.email, validate.password);
        return res.send(UserData);
    } catch(error) {
        res.status(400).send(error.message)
    }
}

const login = async(req, res, next) => {
    try {
        const validated = await loginSchema.validateAsync(req.body);
        const userData = await userLogin(validated.email, validated.password);
        res.status(200).send(userData);
    } catch(error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    registration,
    login
}