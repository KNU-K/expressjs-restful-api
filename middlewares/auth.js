const CustomError = require("../helpers/customError");

module.exports = {
  authMiddleware: (req, res, next) => {
    if (req.user) next();
    else {
      throw new CustomError(403, "you need auth");
    }
  },
};
