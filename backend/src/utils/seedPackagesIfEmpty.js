import Package from "../models/Package.js";
import { seedPackages } from "../seed/packages.js";

export const seedPackagesIfEmpty = async () => {
  const count = await Package.countDocuments();

  if (count > 0) {
    console.log(`Packages already present (${count}). Skipping auto-seed.`);
    return;
  }

  const inserted = await Package.insertMany(seedPackages);
  console.log(`Auto-seeded ${inserted.length} travel packages.`);
};
