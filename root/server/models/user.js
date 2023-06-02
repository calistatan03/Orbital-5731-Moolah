const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//validation
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

//create user Schema
const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn: "7d"}); //token expires in 7 days
    return token
};

const User = mongoose.model("user", userSchema);

//create validate function to be used in user.js and auth.js
const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"), //required here means like its required for the user to input smt
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data)
};

module.exports = {User, validate};
