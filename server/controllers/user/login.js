const { userLogin } = require("../../service/user.service");

const login = async(req, res, next) => {
    try {
        const validated = await loginSchema.validateAsync(req.body);
        const userData = await userLogin(validated.email, validated.password);
        res.status(200).send(userData);
    } catch(error) {
        res.status(400).send(error.message)
    }
}

module.exports = login;