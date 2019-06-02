const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.get('Authorization') || '';

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err
      })
    }

    req.user = decoded.userDB;
    next();
  })
};

module.exports = { verifyToken };
