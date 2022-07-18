const { userRegistration } = require("../../service/user.service");

const registration = async(req, res, next) => {
    try {
        const validate = await registrationSchema.validateAsync(req.body)

        const UserData = await userRegistration(validate.email, validate.password);
        return res.send(UserData);
    } catch(error) {
        res.status(400).send(error.message)
    }
}

module.exports = registration;