const jwt = require('jsonwebtoken');
require('dotenv').config();

//If the token is in the local storage
module.exports = function(req, res, next) {
  //Get token from header
  const token = req.header('jwt_token');

  //If no token
  if(!token) return res.status(403).json({ // 403 as not authorized
    msg: 'Not authorized'
  });

  //Verify token
  try {
    const payload = jwt.verify(token, process.env.jwtSecret);
    req.user = payload.user;
    next();

  } catch (err) {
    return res.status(401).json({
      msg: 'Invalid token'
    })
  }
}