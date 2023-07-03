const jwt = require('jsonwebtoken');
const {User} = require('../models/user');

const requireAuth = async (req, res, next) => { 
  // verify that user is authenticated 
  const { authorization } = req.headers;

  if (!authorization) { 
    return res.status(401).json({error: 'Authorization token required'})
  }

  // get the token from { authorization }
  // split the string so that we only obtain the token and not the first part which is 'Bearer' 

  const token = authorization.split(' ')[1]

  try { 

    // verify that token has not been tampered with 
    const { _id} = jwt.verify(token, process.env.JWTPRIVATEKEY);

    // using the id from the payload, try to find this user from the database 
    // we are attaching the data to a property called 'user' of the request body 
    req.user = await User.findOne({ _id: _id }).select('_id');
    next()

  } catch (error) { 
    console.log(error);
    res.status(401).json({error: 'Request is not authorized'});

  }
}

module.exports = requireAuth;