import Package from "../models/Package.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import AppError from "../utils/AppError.js";
import { isDatabaseReady } from "../config/db.js";
import { seedPackages } from "../seed/packages.js";
import { sortPackages } from "../utils/packageOrder.js";

const catalog = seedPackages.map((pkg, index) => ({
  ...pkg,
  id: `seed-${index + 1}`,
  available: pkg.available !== false,
}));

const matchesQuery = (pkg, query) => {
  if (query.available === "true" && pkg.available === false) return false;
  if (query.available === "false" && pkg.available !== false) return false;
  if (query.type && pkg.type !== query.type) return false;
  if (query.category && pkg.category !== query.category) return false;
  return true;
};

const requireDatabase = () => {
  if (!isDatabaseReady()) {
    throw new AppError("Database is not connected. Start MongoDB and try again.", 503);
  }
};

export const getPackages = asyncHandler(async (req, res) => {
  if (!isDatabaseReady()) {
    const data = sortPackages(catalog.filter((pkg) => matchesQuery(pkg, req.query)));
    res.status(200).json({
      success: true,
      count: data.length,
      source: "catalog",
      data,
    });
    return;
  }

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

  const packages = await Package.find(filter);
  const europePackage = catalog.find((pkg) => pkg.title === "Europe Delight Tour");
  if (
    europePackage &&
    matchesQuery(europePackage, req.query) &&
    !packages.some((pkg) => pkg.title === europePackage.title)
  ) {
    packages.push(europePackage);
  }

  res.status(200).json({
    success: true,
    count: packages.length,
    source: "database",
    data: sortPackages(packages),
  });
});

export const getPackageById = asyncHandler(async (req, res) => {
  if (!isDatabaseReady()) {
    const pkg = catalog.find((item) => item.id === req.params.id);
    if (!pkg) {
      throw new AppError("Package not found", 404);
    }
    res.status(200).json({ success: true, source: "catalog", data: pkg });
    return;
  }

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
  requireDatabase();
  const pkg = await Package.create(req.body);

  res.status(201).json({
    success: true,
    message: "Package created successfully",
    data: pkg,
  });
});

export const updatePackage = asyncHandler(async (req, res) => {
  requireDatabase();
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
  requireDatabase();
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
