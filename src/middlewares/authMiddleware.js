const jwtManager = require('../JWTManager');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(401).json({message: 'Unauthorized'});
  }

  try {
    const decoded = jwtManager.verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({message: 'Unauthorized'});
  }
};

module.exports = authenticateUser;
