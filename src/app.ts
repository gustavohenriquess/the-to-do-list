import express from "express";
import { router } from "./routes";

const app = express();

app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

app.use("/api/v1", router);
export { app };
