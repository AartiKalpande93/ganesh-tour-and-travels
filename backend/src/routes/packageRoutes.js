import { Router } from "express";
import {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} from "../controllers/packageController.js";
import { packageBodyValidators, packageIdValidator } from "../middleware/validators.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/", getPackages);
router.get("/:id", packageIdValidator, validate, getPackageById);
router.post("/", packageBodyValidators, validate, createPackage);
router.put("/:id", [...packageIdValidator, ...packageBodyValidators], validate, updatePackage);
router.delete("/:id", packageIdValidator, validate, deletePackage);

export default router;
