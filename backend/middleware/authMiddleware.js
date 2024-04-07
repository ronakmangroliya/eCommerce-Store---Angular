const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../utils/config');

function authenticateToken(req, res, next) {
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Access denied' });
  }

  const token = authHeader.substring('Bearer '.length);
  
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
};
