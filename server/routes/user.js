//register route
const router = require("express").Router(); //imports the Express Router module and creates a new router object that can be used to define routes
const req = require("express/lib/request");
const jwt = require('jsonwebtoken');
const {User} = require("../models/user"); //User model represents a user in the database, and the validate function is used to validate user data.
const bcrypt = require("bcrypt"); // imports the bcrypt module, which is used for password hashing and salting.


// create a json web token 
const createToken = (_id) => { 
    return jwt.sign({_id}, process.env.JWTPRIVATEKEY, {expiresIn: "7d"})

}

// sign up route 
router.post("/", async (req, res) => { //handles the request when a client sends a POST request to create a new user.
    
    const {firstName, lastName, email, password} = req.body; 
    try { 
        const user = await User.signup(firstName, lastName, email, password)

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
        if(error)
            return res.status(400).send({message: error.details[0].message});

        const user = await User.findOne({ email: req.body.email}); //searches for a user in the database based on the email provided in the request body
        if (user)
            return res.status(409).send({message: "User with given email already exists!"});

        const salt = await bcrypt.genSalt(Number(process.env.SALT)); //generates a salt using the genSalt function from the bcrypt module. The salt is used during password hashing to add additional complexity and security.
        const hashPassword = await bcrypt.hash(req.body.password, salt); //hashes the password provided in the request body using the generated salt

        await new User({...req.body, password: hashPassword}).save(); //save method is then called to save the user to the database
        res.status(201).send({message: "User created successfully"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})
*/

module.exports = router; //exports the router object so that it can be used in other parts of the application