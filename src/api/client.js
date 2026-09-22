const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const error = new Error(data?.message || "Something went wrong. Please try again.");
    error.status = response.status;
    error.errors = data?.errors || null;
    throw error;
  }

  return data;
};
