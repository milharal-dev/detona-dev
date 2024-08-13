import express from "express";
import roasterRouter from "./routes/roaster.routes.js";

// This is the main function that will be called when the app is started with yarn start, or your favorite package manager. (could be bun if you're insane)
async function main() {
  const port = process.env.NODE_API_PORT ?? 3000;
  const app = express();
  app.use(express.json());
  app.listen(port, () => console.log(`Server is running on port ${port}`));
  app.use("/roaster", roasterRouter);
}

// Entrypoint.
await main().catch(console.error);
