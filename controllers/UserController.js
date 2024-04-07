const { raw } = require('express');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUser = await User.create({ email, password });

      res.status(201).json({
        status: 'success',
        message: 'Successfully registered',
        body: {
          id: newUser.id,
          email: newUser.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw {
          name: 'BadRequest',
          message: 'Email is required',
        };
      }

      if (!password) {
        throw {
          name: 'BadRequest',
          message: 'Password is required',
        };
      }

      const user = await User.findOne({ where: { email } });
      if (!user || !comparePassword(password, user.password)) {
        throw {
          name: 'Unauthenticated',
          message: 'Invalid email/password',
        };
      }

      const access_token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        status: 'success',
        message: 'Successfully login',
        body: {
          access_token,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;