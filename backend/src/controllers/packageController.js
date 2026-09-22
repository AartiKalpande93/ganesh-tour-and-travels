import Package from "../models/Package.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import AppError from "../utils/AppError.js";

export const getPackages = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.available === "true") {
    filter.available = true;
  } else if (req.query.available === "false") {
    filter.available = false;
  }

  if (req.query.type) {
    filter.type = req.query.type;
  }

  if (req.query.category) {
    filter.category = req.query.category;
  }

  const packages = await Package.find(filter).sort({ year: 1, createdAt: 1 });

  res.status(200).json({
    success: true,
    count: packages.length,
    data: packages,
  });
});

export const getPackageById = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id);

  if (!pkg) {
    throw new AppError("Package not found", 404);
  }

  res.status(200).json({
    success: true,
    data: pkg,
  });
});

export const createPackage = asyncHandler(async (req, res) => {
  const pkg = await Package.create(req.body);

  res.status(201).json({
    success: true,
    message: "Package created successfully",
    data: pkg,
  });
});

export const updatePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!pkg) {
    throw new AppError("Package not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Package updated successfully",
    data: pkg,
  });
});

export const deletePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findByIdAndDelete(req.params.id);

  if (!pkg) {
    throw new AppError("Package not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Package deleted successfully",
    data: { id: pkg.id },
  });
});
