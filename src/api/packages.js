import { apiRequest } from "./client";

export const fetchPackages = () => apiRequest("/packages");

export const fetchPackageById = (id) => apiRequest(`/packages/${id}`);
