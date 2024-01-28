const jwt = require('jsonwebtoken')
const JWT_SECRET  = process.env.JWT_SECRET || require('../secrets').JWT_SECRET

const authRequired = (req, res, next) => {
  const token = req.get('Authorization').split(' ')[1];
  console.log(token);

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: 'Unauthorized',
    })
    throw new Error('Token invalid');
  }
  next()
}

module.exports = { authRequired }