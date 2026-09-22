import { apiRequest } from "./client";

export const submitContactForm = (formData) =>
  apiRequest("/contact", {
    method: "POST",
    body: JSON.stringify(formData),
  });
