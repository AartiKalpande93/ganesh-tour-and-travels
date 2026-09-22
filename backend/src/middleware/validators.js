import { body, param } from "express-validator";

export const contactValidators = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[+]?[\d\s-]{10,15}$/)
    .withMessage("Enter a valid phone number"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  body("destination")
    .trim()
    .notEmpty()
    .withMessage("Destination / Package is required")
    .isLength({ max: 200 })
    .withMessage("Destination cannot exceed 200 characters"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 2000 })
    .withMessage("Message cannot exceed 2000 characters"),
];

export const packageIdValidator = [
  param("id").isMongoId().withMessage("Invalid package ID"),
];

export const packageBodyValidators = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("destination").trim().notEmpty().withMessage("Destination is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("duration").trim().notEmpty().withMessage("Duration is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number"),
  body("image").trim().notEmpty().withMessage("Image URL is required"),
  body("highlights").optional().isArray().withMessage("Highlights must be an array"),
  body("inclusions").optional().isArray().withMessage("Inclusions must be an array"),
  body("exclusions").optional().isArray().withMessage("Exclusions must be an array"),
  body("available").optional().isBoolean().withMessage("Available must be a boolean"),
  body("date").optional().trim().isString(),
  body("year").optional().isInt({ min: 2000 }).withMessage("Year must be a valid number"),
  body("note").optional().trim().isString(),
  body("type")
    .optional()
    .isIn(["Domestic", "International", "Pilgrimage"])
    .withMessage("Type must be Domestic, International, or Pilgrimage"),
  body("category").optional().trim().isString(),
];
