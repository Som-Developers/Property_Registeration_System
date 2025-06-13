const { registervalidate } = require("../validators/userValidator");

const registerUserMiddleware = (req, res, next) => {
    const { error } = registervalidate.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const loginUserMiddleware = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = {
    registerUserMiddleware,
    loginUserMiddleware
};
