const User = require("../models/User");
const { comparePassword } = require("../helper/hash");
const { generateToken } = require("../helper/jwt");

class UserController {
  // setiap fungsi dari controller menerima 3 parameter
  // req = adalah parameter dari request yang didapat dari frontend
  // res = adalah parameter untuk response yang akan dikembalikan ke frontend atau consumer
  // next = untuk lanjut ke proses selanjutnya, (utk kasus kita, diberikan ke middleware error handling)
  static async register(req, res, next) {
    try {
      const properties = {};
      // menyusun properti yang akan di insert ke database
      properties["username"] = req.body.username;
      properties["email"] = req.body.email;
      properties["password"] = req.body.password;

      const data = await User.create(properties);

      return res
        .status(201)
        .json({ data: data, message: "success register", status: "success" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      // cari user yang akan login
      const foundUser = await User.findOne({ email: req.body.email }).exec();

      // jika ketemu, compare passwordnya
      if (foundUser && comparePassword(req.body.password, foundUser.password)) {
        const tokenPayload = {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
        }; // payload atau data user yang akan digenerate menjadi token

        const access_token = generateToken(tokenPayload);

        res.status(200).json({
          message: "success login",
          data: { access_token },
          status: "success",
        });
      } else {
        throw {
          status: 400,
          message: "Invalid Username or Password",
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async findAllUser(req, res, next) {
    try {
      let data = await User.find({}).exec();

      if (data === null) {
        throw {
          status: 404,
          message: "User Not Found",
        };
      }

      return res.status(200).json({
        data: data,
        message: "success GET users",
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async findLoggedUser(req, res, next) {
    try {
      const id = req.loggedUser.id;
      const data = await User.findById(id).exec();

      // jika user tidak ada
      if (data === null) {
        throw {
          status: 404,
          message: "User Not Found",
        };
      }

      return res.status(200).json({
        data: data,
        message: "success find logged user",
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async findById(req, res, next) {
    try {
      const id = req.params.id;

      // .exec() berfungsi untuk mengeksekusi query
      const data = await User.findById(id).exec();

      // jika user tidak ada
      if (data === null) {
        throw {
          status: 404,
          message: "User Not Found",
        };
      }

      return res.status(200).json({
        data: data,
        message: "success find by id user",
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const id = req.loggedUser.id;

      const data = await User.findById(id).exec();

      // jika user tidak ada
      if (data === null) {
        throw {
          status: 404,
          message: "User Not Found",
        };
      }

      // update data
      data["username"] = req.body.username ? req.body.username : data.username;
      data["email"] = req.body.email ? req.body.email : data.email;
      data["updated_at"] = new Date().toISOString();

      const updatedData = await data.save();

      return res.status(200).json({
        data: updatedData,
        message: "success update user",
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const id = req.loggedUser.id;

      const data = await User.findById(id).exec();

      // jika user tidak ada
      if (data === null) {
        throw {
          status: 404,
          message: "User Not Found",
        };
      }

      const deleted = await data.remove();

      return res.status(200).json({
        data: deleted,
        message: "success delete user",
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
