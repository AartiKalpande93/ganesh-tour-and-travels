import { sendContactEmail } from "../services/emailService.js";
import { asyncHandler } from "../middleware/errorHandler.js";

export const submitContact = asyncHandler(async (req, res) => {
  const { name, phone, email, destination, message } = req.body;
  const emailResult = await sendContactEmail({
    name,
    phone,
    email,
    destination,
    message,
  });

  res.status(201).json({
    success: true,
    message: emailResult.confirmationEmailSent
      ? "Thank you! Your message has been sent and a confirmation email is on its way. We will contact you soon."
      : "Your message was sent, but we could not send a confirmation email. We will contact you soon.",
    data: {
      name,
      email,
      destination,
      emailSent: true,
      messageId: emailResult.messageId,
      confirmationEmailSent: emailResult.confirmationEmailSent,
      confirmationMessageId: emailResult.confirmationMessageId,
    },
  });
});
