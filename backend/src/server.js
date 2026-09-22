import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env, validateEnv, isSmtpConfigured, getSmtpConfigError } from "./config/env.js";
import { verifyEmailTransport } from "./services/emailService.js";
import { seedPackagesIfEmpty } from "./utils/seedPackagesIfEmpty.js";

const startServer = async () => {
  validateEnv();
  await connectDB();
  await seedPackagesIfEmpty();
  await verifyEmailTransport();

  if (!isSmtpConfigured()) {
    console.warn("────────────────────────────────────────");
    console.warn("CONTACT EMAIL BLOCKED UNTIL SMTP IS SET");
    console.warn(getSmtpConfigError());
    console.warn("────────────────────────────────────────");
  }

  app.listen(env.port, () => {
    console.log(`Express API running on http://localhost:${env.port}`);
    console.log(`Health: http://localhost:${env.port}/api/health`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
