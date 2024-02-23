/** @format */

import express, { Express, Application } from "express";
import { route as userRoutes } from "./routes/user";

const app: Application = express();

app.use("/api/users", userRoutes);
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server is running on port `, PORT);
});

export default app;
