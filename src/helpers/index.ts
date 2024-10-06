export * from "./aws.helper";
import type { Express } from "express";
import { readdir, readFileSync } from "fs";
import http from "http";
import https from "https";
import mongoose from "mongoose";
import configs from "../configs";
import voiceMemoRoutes from '../routes/voicememo.routes';

export function setupServer(app: Express) {
  let server;
  if (configs.PORT === 443)
    server = https.createServer(
      { cert: readFileSync(configs.CERT), key: readFileSync(configs.KEY) },
      app
    );
  server = http.createServer(app);
  server.listen(configs.PORT, () =>
    console.log(`🚀🚀🚀 http://localhost:${configs.PORT} 🚀🚀🚀`)
  );
}

export function setupDatabase() {
  mongoose
    .connect(configs.MONGO_URI)
    .then(() => console.log("MongoDB Ready to 🚀🚀🚀"))
    .catch((err) => console.log("MongoDB connection error:", err));
}

export function setupRoutes(app: Express) {
  app.use(`/api/v1/voicememo/`, voiceMemoRoutes);
}
