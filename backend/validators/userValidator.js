const Joi = require("joi")

<<<<<<< HEAD
const registervalidate = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()    
})
=======
const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("user", "admin")  // 👈 add this line
});


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

>>>>>>> a63e71589f29cb2165fd5c939b01e3dbfc11f7bf
module.exports = {
    registervalidate
}
    