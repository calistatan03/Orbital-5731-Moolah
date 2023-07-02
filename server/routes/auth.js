//login route
const router = require("express").Router();
const {User} = require("../models/user");
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

// login route 

// create a json web token 
const createToken = (_id) => { 
    return jwt.sign({_id}, process.env.JWTPRIVATEKEY, {expiresIn: "7d"})
}

router.post("/", async (req, res) => {

    const {email, password} = req.body; 

    try { 
        const user = await User.login(email, password)

        const { firstName, lastName } = user; 

        // create a token (and send the token back to the browser)
        const token = createToken(user._id);

        res.status(200).json({email, firstName, lastName, token})
    } catch (error) { 
        res.status(400).json({error: error.message})
    }
})
/*
    try {
        const {error} = validate(req.body);
        if (error)
            return res.status(400).send({message: error.details[0].message});

        const user = await User.findOne({email: req.body.email});
        if (!user)  { //if a user does not exist
            return res.status(401).send({message: "Invalid Email or Password"});
        }

        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );
        if (!validPassword) {
            return res.status(401).send({message: "Invalid Email or Password"});
        }

        const token = jwt.sign({id: user._id}, "secret");

        // const token = user.generateAuthToken();
        res.status(200).send({data: token, message: "Logged in successfully"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
})

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
}
*/

module.exports = router;