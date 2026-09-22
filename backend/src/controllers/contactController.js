import Contact from "../models/Contact.js";
import { sendContactEmail } from "../services/emailService.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import AppError from "../utils/AppError.js";

export const submitContact = asyncHandler(async (req, res) => {
  const { name, phone, email, destination, message } = req.body;

  const contact = await Contact.create({
    name,
    phone,
    email,
    destination,
    message,
  });

  try {
    const emailResult = await sendContactEmail(contact);
    contact.emailSent = true;
    await contact.save();

    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been sent successfully. We will contact you soon.",
      data: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        destination: contact.destination,
        emailSent: true,
        messageId: emailResult.messageId,
      },
    });
  } catch (error) {
    // Submission stays in MongoDB; do not pretend email succeeded
    if (error instanceof AppError) {
      throw error;
    }

    console.error("Failed to send contact email:", error.message);
    throw new AppError(
      "Your inquiry was saved, but the enquiry email could not be sent. Please try again or contact us directly.",
      502
    );
  }
});
