const signupController = async (req, res) => { //handles the request when a client sends a POST request to create a new user.
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
}

export default signupController;
