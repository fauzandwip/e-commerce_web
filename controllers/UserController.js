const { raw } = require('express');
const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User, Profile } = require('../models');

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

  static async resetPassword(req, res, next) {
    try {
      const { email } = req.user;
      const { oldPassword, newPassword } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!comparePassword(oldPassword, user.password)) {
        throw {
          name: 'Unauthenticated',
          message: 'Invalid password',
        };
      }

      await user.update({
        password: newPassword,
      });

      res.status(200).json({
        status: 'success',
        message: 'Successfully reset the password',
      });
    } catch (error) {
      next(error);
    }
  }

  static async createProfile(req, res, next) {
    try {
      const { id } = req.user;
      const { firstName, lastName, address } = req.body;
      const profile = await Profile.findOne({ where: { user_id: id } });

      if (profile) {
        throw {
          name: 'BadRequest',
          message: 'User has created the profile',
        };
      }

      const newProfile = await Profile.create({
        user_id: id,
        firstName,
        lastName,
        address,
      });

      res.status(201).json({
        status: 'success',
        message: 'Successfully created the profile',
        body: newProfile,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { id } = req.user;
      const { firstName, lastName, address } = req.body;
      const profile = await Profile.findOne({ where: { user_id: id } });

      if (!profile) {
        throw {
          name: 'NotFound',
          message: 'Profile not found',
        };
      }

      const updatedProfile = await profile.update({
        firstName,
        lastName,
        address,
      });

      res.status(200).json({
        status: 'success',
        message: 'Successfully updated the profile',
        body: updatedProfile,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
