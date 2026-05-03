import express from "express";
import { runTestCases } from "./controllers/runTestCases.js";
import { compileCode } from "./controllers/compileCode.js";
import "dotenv/config";

const app = express();

app.use(express.json());

app.post("/run", compileCode);
app.post("/submit", runTestCases);

const PORT = process.env.COMPILER_PORT || 6000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Compile service running on port ${PORT}`);
});
