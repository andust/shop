import express from "express";

import v1ApiRoutes from "./routes/v1";

const app = express();

app.use("/api/v1", v1ApiRoutes);

export default app;
