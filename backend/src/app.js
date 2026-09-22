import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import apiRoutes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

const configuredOrigins = env.clientUrl
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const localDevOrigin = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/;

const corsOrigin = (origin, callback) => {
  if (!origin || configuredOrigins.includes(origin)) {
    callback(null, true);
    return;
  }

  if (env.nodeEnv !== "production" && localDevOrigin.test(origin)) {
    callback(null, true);
    return;
  }

  callback(null, false);
};

app.use(
  cors({
    origin: corsOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept"],
  })
);

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Ganesh Tour and Travels API",
    endpoints: {
      health: "/api/health",
      contact: "POST /api/contact",
      packages: "GET /api/packages",
      packageById: "GET /api/packages/:id",
    },
  });
});

app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
