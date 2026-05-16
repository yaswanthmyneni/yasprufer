import { Router } from "express";
import {
  createProblem,
  getProblems,
  getProblemWithoutTestcases,
  getProblemWithTestcases,
} from "../controllers/problem.js";
import { auth } from "../middleware/auth.js";

const problemRouter = new Router();

/**
 * @method POST
 * @path /problem/create
 */
problemRouter.post("/create", auth, createProblem);

/**
 * @method GET
 * @path /problem/
 */
problemRouter.get("/", getProblems);

/**
 * @method GET
 * @path /problem/:id
 */
problemRouter.get("/:id", getProblemWithoutTestcases);

/**
 * @method GET
 * @path /problem/internal/:id
 */
problemRouter.get("/internal/:id", getProblemWithTestcases);

export { problemRouter };
