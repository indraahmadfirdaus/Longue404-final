const User = require('../models/User');
const { verifyToken } = require('../helper/jwt');

const userAuthentication = async (req, res, next) => {
  try {
    // fungsi verify token adalah untuk menerjemahkan / decode token jwt yang berisi payload dari data user yang sedang login
    const decoded = verifyToken(req.headers.access_token);
    const found = await User.findById(decoded.id).exec();

    // jika user ketemu, (dicari berdasarkan email)
    if (found) {
      // assign ke payload request user yang sudah login
      req['loggedUser'] = decoded;
      next();
    } else {
      throw {
        status: 401,
        message: 'Unauthorized',
      };
    }
  } catch (error) {
    next(error);
  }
};

// authorisasi untuk routes yang hanya bisa diakses oleh user yang sedang login
const userAuthorization = async (req, res, next) => {
  try {
    const idUser = req.loggedUser.id; // didapat dari middleware sebelumnya yaitu authentikasi
    const paramsId = req.params.id;

    // jika yang login sama dengan id di params
    if (idUser === paramsId) {
      next();
    } else {
      throw {
        status: 401,
        message: 'Unauthorized',
      };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userAuthentication,
  userAuthorization,
};
