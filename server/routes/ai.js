import { Router } from "express";
import { codeAnalysis } from "../controllers/ai.js";
import { auth } from "../middleware/auth.js";

const aiRouter = new Router();

/**
 * @method POST
 * @path /ai/code-analysis
 */
aiRouter.post("/code-analysis", auth, codeAnalysis);

export { aiRouter };
