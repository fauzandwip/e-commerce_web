const guardAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;

    console.log(req.user);
    if (role !== 'admin') {
      throw {
        name: 'Forbidden',
        message: 'You are not authorized, ADMIN only',
      };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  guardAdmin,
};
