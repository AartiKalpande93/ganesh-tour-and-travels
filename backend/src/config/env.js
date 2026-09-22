import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const PLACEHOLDER_FRAGMENTS = [
  "your-email",
  "your-gmail",
  "your-16-char",
  "your-app-password",
  "changeme",
  "password",
  "xxxxx",
];

export const isPlaceholderValue = (value = "") => {
  const normalized = String(value).trim().toLowerCase();
  if (!normalized) return true;
  return PLACEHOLDER_FRAGMENTS.some((fragment) => normalized.includes(fragment));
};

export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongodbUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ganeshtour",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  contactToEmail: process.env.CONTACT_TO_EMAIL || "aartikalpande93@gmail.com",
  smtp: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER || "",
    pass: String(process.env.SMTP_PASS || "").replace(/\s+/g, ""),
    fromName: process.env.SMTP_FROM_NAME || "Ganesh Tour and Travels",
    fromEmail: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "",
  },
};

export const getSmtpConfigError = () => {
  if (isPlaceholderValue(env.smtp.user)) {
    return "SMTP_USER is missing or still a placeholder. Set it to your Gmail address in backend/.env";
  }
  if (isPlaceholderValue(env.smtp.pass)) {
    return "SMTP_PASS is missing or still a placeholder. Set a Gmail App Password (16 characters) in backend/.env";
  }
  if (env.smtp.pass.length < 16) {
    return "SMTP_PASS looks invalid. Gmail App Passwords are 16 characters (spaces are optional).";
  }
  if (isPlaceholderValue(env.contactToEmail)) {
    return "CONTACT_TO_EMAIL is missing or invalid in backend/.env";
  }
  return null;
};

export const isSmtpConfigured = () => getSmtpConfigError() === null;

export const validateEnv = () => {
  if (!env.mongodbUri) {
    throw new Error("MONGODB_URI is required in backend/.env");
  }

  if (env.nodeEnv === "production" && !isSmtpConfigured()) {
    throw new Error(getSmtpConfigError());
  }
};
