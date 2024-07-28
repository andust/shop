import { Server } from "http";
import mongoose from "mongoose";
import "dotenv";

import app from "./app";
import logger from "./config/logger";
import config from "./config/config";

let server: Server | null;

mongoose
  .connect(`${config.SOS_DB}/${config.DB_NAME}`)
  .then(() => {
    logger.info("Connected to MongoDB");
    server = app.listen(config.port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${config.port}`
      );
    });
  })
  .catch((error: Error) => {
    console.error(error);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);

process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  if (server) {
    server.close();
  }
});
