const jwt = require("jsonwebtoken")

const generateTokens = (user) => {
    const accessToken = jwt.sign(user, process.env.ACCESS_SECRET, { expiresIn: '1d' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: '1d' });
    return {
        accessToken,
        refreshToken
    }
}

module.exports = {
    generateTokens,
}