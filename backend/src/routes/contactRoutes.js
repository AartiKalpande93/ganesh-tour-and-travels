import { Router } from "express";
import { submitContact } from "../controllers/contactController.js";
import { contactValidators } from "../middleware/validators.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.post("/", contactValidators, validate, submitContact);

export default router;
