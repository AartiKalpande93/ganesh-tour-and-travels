import { Router } from "express";
import contactRoutes from "./contactRoutes.js";
import packageRoutes from "./packageRoutes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Ganesh Tour and Travels API is running",
  });
});

router.use("/contact", contactRoutes);
router.use("/packages", packageRoutes);

export default router;
