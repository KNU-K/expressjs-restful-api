const CustomError = require("../helpers/customError");

const ErrorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.json({ statusCode: err.statusCode, msg: err.message });
  } else {
    res.json({ msg: "fail" });
  }
};
module.exports = { ErrorHandler };
