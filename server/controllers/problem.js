import Problem from "../models/problem.js";

/**
 * @method POST
 * @path /problem/create
 */
const createProblem = async (req, res) => {
  try {
    const problem = new Problem(req.body);
    await problem.save();

    res.status(201).json({
      success: true,
      message: "Problem created successfully",
      data: problem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @method GET
 * @path /problem/
 */
const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    const problemsWithoutTestcases = problems.map((problem) => {
      const obj = problem.toObject();
      delete obj.testcases;
      return obj;
    });

    res.status(200).json({
      success: true,
      count: problems.length,
      problems: problemsWithoutTestcases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @method GET
 * @path /problem/internal/:id
 */
const getProblemWithTestcases = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await Problem.findById(id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      data: problem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @method GET
 * @path /problem/:id
 */
const getProblemWithoutTestcases = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await Problem.findById(id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }
    problem.testcases = [];

    res.status(200).json({
      success: true,
      data: problem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export {
  createProblem,
  getProblems,
  getProblemWithTestcases,
  getProblemWithoutTestcases,
};
