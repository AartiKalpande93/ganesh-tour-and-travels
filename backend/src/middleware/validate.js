import { validationResult } from "express-validator";
import AppError from "../utils/AppError.js";

export const validate = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = result.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return next(new AppError("Validation failed", 400, errors));
  }

  next();
};
