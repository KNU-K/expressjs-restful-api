<<<<<<< HEAD
const CustomError = require("../helpers/custom-error");
=======
const CustomError = require("../helpers/customError");
>>>>>>> master

module.exports = {
  authMiddleware: (req, res, next) => {
    if (req.user) next();
    else {
      throw new CustomError(403, "you need auth");
    }
  },
};
