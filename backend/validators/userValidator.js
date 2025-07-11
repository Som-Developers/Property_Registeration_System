const Joi = require("joi")

const registervalidate = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()    
})
module.exports = {
    registervalidate
}