import cors from "cors";
import express from "express";

import { setupDatabase, setupRoutes, setupServer } from "./helpers";

const app = express();

app
  .use(cors())
  .use(express.json());

setupRoutes(app);
setupDatabase();
setupServer(app);

export default app;
