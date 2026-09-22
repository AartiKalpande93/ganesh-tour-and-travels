/**
 * Starts the portable MongoDB included under backend/.mongodb
 * Usage: node scripts/start-mongo.js
 */
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import net from "net";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, "..");
const mongodPath = path.join(backendRoot, ".mongodb", "bin", "mongod.exe");
const dbPath = path.join(backendRoot, ".mongo-data");

const isPortOpen = (port) =>
  new Promise((resolve) => {
    const socket = net.connect({ host: "127.0.0.1", port }, () => {
      socket.end();
      resolve(true);
    });
    socket.on("error", () => resolve(false));
  });

const start = async () => {
  if (await isPortOpen(27017)) {
    console.log("MongoDB already running on port 27017");
    return;
  }

  if (!fs.existsSync(mongodPath)) {
    console.error(`mongod not found at ${mongodPath}`);
    console.error("Portable MongoDB binary is missing. Re-run setup.");
    process.exit(1);
  }

  fs.mkdirSync(dbPath, { recursive: true });

  const child = spawn(mongodPath, ["--dbpath", dbPath, "--bind_ip", "127.0.0.1", "--port", "27017"], {
    detached: true,
    stdio: "ignore",
    windowsHide: true,
  });

  child.unref();

  for (let i = 0; i < 20; i += 1) {
    await new Promise((r) => setTimeout(r, 500));
    if (await isPortOpen(27017)) {
      console.log("MongoDB started on mongodb://127.0.0.1:27017");
      return;
    }
  }

  console.error("MongoDB did not become ready on port 27017");
  process.exit(1);
};

start();
