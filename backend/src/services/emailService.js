import nodemailer from "nodemailer";
import { env, getSmtpConfigError, isSmtpConfigured } from "../config/env.js";
import AppError from "../utils/AppError.js";

let transporter = null;

const createTransporter = () => {
  const configError = getSmtpConfigError();
  if (configError) {
    throw new AppError(configError, 503);
  }

  return nodemailer.createTransport({
    service: "gmail",
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass,
    },
  });
};

export const getTransporter = () => {
  if (!transporter) {
    transporter = createTransporter();
  }
  return transporter;
};

export const verifyEmailTransport = async () => {
  if (!isSmtpConfigured()) {
    console.warn(`Email not ready: ${getSmtpConfigError()}`);
    console.warn(
      "Create a Gmail App Password at https://myaccount.google.com/apppasswords and set SMTP_USER / SMTP_PASS in backend/.env"
    );
    return false;
  }

  try {
    await getTransporter().verify();
    console.log(`Email SMTP verified for ${env.smtp.user} → ${env.contactToEmail}`);
    return true;
  } catch (error) {
    transporter = null;
    console.error("Email SMTP verification failed:", error.message);
    console.error(
      "Use a Gmail App Password (not your normal Gmail password). Enable 2-Step Verification first."
    );
    return false;
  }
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const sendContactEmail = async (contact) => {
  const configError = getSmtpConfigError();
  if (configError) {
    throw new AppError(configError, 503);
  }

  const mailer = getTransporter();
  const { name, phone, email, destination, message } = contact;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0369A1;">New Contact Inquiry — Ganesh Tour and Travels</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Name</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Phone</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(phone)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(email)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Destination / Package</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(destination)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; vertical-align: top;">Message</td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; white-space: pre-wrap;">${escapeHtml(message)}</td>
        </tr>
      </table>
    </div>
  `;

  try {
    const info = await mailer.sendMail({
      from: `"${env.smtp.fromName}" <${env.smtp.fromEmail}>`,
      to: env.contactToEmail,
      replyTo: email,
      subject: `New Inquiry from ${name} — ${destination}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Destination / Package: ${destination}`,
        `Message: ${message}`,
      ].join("\n"),
      html,
    });

    return {
      messageId: info.messageId,
      accepted: info.accepted,
      response: info.response,
    };
  } catch (error) {
    console.error("Nodemailer send error:", error.message);
    throw new AppError(
      "Could not send enquiry email. Check SMTP_USER / SMTP_PASS (Gmail App Password required).",
      502
    );
  }
};
