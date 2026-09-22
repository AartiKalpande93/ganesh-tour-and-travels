import { verifyEmailTransport, sendContactEmail } from "../src/services/emailService.js";
import { connectDB } from "../src/config/db.js";
import { validateEnv, isSmtpConfigured, getSmtpConfigError, env } from "../src/config/env.js";
import Contact from "../src/models/Contact.js";

const run = async () => {
  validateEnv();

  if (!isSmtpConfigured()) {
    console.error(getSmtpConfigError());
    process.exit(1);
  }

  await connectDB();
  const ok = await verifyEmailTransport();
  if (!ok) process.exit(1);

  const contact = await Contact.create({
    name: "SMTP Test",
    phone: "+91 9999999999",
    email: "smtp-test@example.com",
    destination: "Email Configuration Test",
    message: "This is an automated test from Ganesh Tour and Travels backend.",
  });

  const result = await sendContactEmail(contact);
  contact.emailSent = true;
  await contact.save();

  console.log("Test enquiry email sent successfully.");
  console.log(`To: ${env.contactToEmail}`);
  console.log(`MessageId: ${result.messageId}`);
  console.log(`SMTP response: ${result.response}`);
  process.exit(0);
};

run().catch((error) => {
  console.error("Email test failed:", error.message);
  process.exit(1);
});
