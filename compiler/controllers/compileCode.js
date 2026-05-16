import { getProblemById } from "../services/getProblemById.js";
import {
  executeCode,
  generateFile,
  generateInputFile,
} from "../utils/index.js";

const compileCode = async (req, res) => {
  const { problemId, lang = "cpp", code, input } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: "Empty code!" });
  }

  try {
    let finalInput = input;

    if (!finalInput) {
      if (!problemId) {
        return res.status(400).json({
          success: false,
          error: "No input or problemId provided",
        });
      }

      const problem = await getProblemById(problemId);

      if (!problem || !problem.testcases.length) {
        return res.status(404).json({
          success: false,
          error: "Problem or testcases not found",
        });
      }

      finalInput = problem.testcases[0].input;
    }

    finalInput = finalInput.replace(/\\n/g, "\n");

    const filePath = generateFile(lang, code);
    const inputFilePath = generateInputFile(finalInput);
    const output = await executeCode(filePath, inputFilePath);

    res.json({ filePath, output });
  } catch (error) {
    if (error.type === "TLE") {
      return res.status(408).json({
        success: false,
        error: "Time Limit Exceeded",
      });
    }

    if (error.type === "OUTPUT_LIMIT") {
      return res.status(408).json({
        success: false,
        error: "Output Limit Exceeded",
      });
    }

    return res.status(500).json({
      success: false,
      error: error.message || "Execution failed",
    });
  }
};

export { compileCode };
