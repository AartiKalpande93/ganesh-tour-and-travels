import { connectDB } from "./config/db.js";
import { validateEnv } from "./config/env.js";
import Package from "./models/Package.js";
import { seedPackages } from "./seed/packages.js";

const seed = async () => {
  try {
    validateEnv();
    await connectDB();

    await Package.deleteMany({});
    const inserted = await Package.insertMany(seedPackages);

    console.log(`Seeded ${inserted.length} travel packages into MongoDB.`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seed();
