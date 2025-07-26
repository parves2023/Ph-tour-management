/* eslint-disable no-console */

import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

// const app = express(); //set it on the app

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);

    console.log("Connected To DB");

    server = app.listen(5000, () => {
      console.log("server is listening to port 5000 ");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// app.get("/", (req: Request, res: Response)=>{ // also sent this into app
//     res.status(200).json({
//         message: "Welcome tour management backend system"
//     })
// })

process.on("SIGTERM", () => {
  console.log("SIGTERM signal recieved... Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal recieved... Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejecttion detected... Server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected... Server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// Unhandler rejection error
// Promise.reject(new Error("I forgot to catch this promise"))

// Uncaught Exception Error
// throw new Error("I forgot to handle this local erro")

/**
 * unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm
 */
