const { User } = require("../models");
const bcrypt = require("bcrypt");
const {generateTokens} = require("./token.service");

const userRegistration = async(email, password) => {
    
    const candidate = await User.findOne({ where: { email } })
    if(candidate){
        throw new Error(`User with address ${email} already exists`)
    }
    
    const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(3));
    const tokens = generateTokens({email, password: hashPassword}); 

    console.log(tokens)
    
    const user = await User.create({
        email: email,
        password: hashPassword,
    })
    
    return {
        user: {email: user.email},
        tokens: {...tokens}
    }
}

const verifyPassword = async (candidate, actual) => {
    if(!candidate || !actual) throw new Error("Missed parameter!");
    return await bcrypt.compare(candidate, actual);
}

const userLogin = async (email, password) => {
    const candidate = await User.findOne({where: { email }});
    if(!candidate){
        throw new Error(`User with address ${email} doesn't exists`)
    }

    const result = await verifyPassword(password, candidate.password);
    
    if(!result){
        throw new Error("Incorrect password!");
    }

    const tokens = generateTokens({email, password: candidate.password});
    
    return {
        user: {email: candidate.email, id: candidate.id},
        tokens: {...tokens}
    }
}

module.exports = {
    userRegistration,
    userLogin
}