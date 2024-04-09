const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw {
        name: 'Unauthenticated',
        message: 'Token must be provided',
      };
    }

    const token = authorization.replace('Bearer ', '');
    const { id } = verifyToken(token);
    const user = await User.findByPk(id);
    if (!user) {
      throw {
        name: 'Unauthenticated',
        message: 'Invalid token',
      };
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
