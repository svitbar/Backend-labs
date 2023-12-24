const jwtManager = require('../JWTManager');

const authenticateUser = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({message: 'Unauthorized'});
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    const decoded = jwtManager.verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({message: 'Unauthorized'});
  }
};

module.exports = authenticateUser;
