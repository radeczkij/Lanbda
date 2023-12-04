const userService = require("../service/user-service.js");
const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service.js");
const UserModel = require("../models/user-model");

class UserController {
  async signUp(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.signUp(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      console.log(req.cookies);
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 1 * 24 * 60 * 60 * 10000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUser(req, res, next) {
    const { email } = req.body;
    try {
      const accessToken = req.headers.authorization.split(" ")[1];

      if (!accessToken) {
        return res.status(401).json({ message: "Unauthorised" });
      }
      const user = await UserModel.findOne({ email });
      console.log(user);
      return res.json({
        request_num: req.params.number,
        data: {
          username: user.email,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
