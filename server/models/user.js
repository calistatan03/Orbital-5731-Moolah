const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
//validation
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

//create user Schema
const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn: "7d"}); //token expires in 7 days
    return token
};

// static signup method 
userSchema.statics.signup = async function(firstName, lastName, email, password) { 

    // validation - check the validity of email and password inputs 

    // check whether firstName has been provided 
    if (!firstName) { 
        throw Error('No first name provided!')
    }

    // check whether email and password have been provided - no blank fields 
    if (!email || !password) { 
        throw Error('No email or password provided!')
    }

    // check if email is valid 
    if (!validator.isEmail(email)) { 
        throw Error('Email is not valid')
    }

    // check if password is strong enough
    if (!validator.isStrongPassword(password)) { 
        throw Error('Password not strong enough');
    }

    const exists = await this.findOne({email})

    if (exists) { 
        throw Error(`User with given email already exists!`)
    }

    // hashing password 
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await this.create({firstName, lastName, email, password: hashPassword});

    return user;

}

// static login method 
userSchema.statics.login = async function(email, password) { 

    if (!email || !password) { 
        throw Error(`No email or password provided!`)
    }

    const user = await this.findOne({email})

    if (!user) { 
        throw Error (`No account with given email found`)
    }

    const match = await bcrypt.compare(password, user.password) 

    if (!match) { 
        throw Error(`Incorrect password`)
    }
    return user

}

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


module.exports = {User};
