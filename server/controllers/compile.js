import { runCode, submitCode } from "../services/compile.js";

const compileRun = async (req, res) => {
  try {
    const response = await runCode(req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const compileSubmit = async (req, res) => {
  try {
    const response = await submitCode(req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { compileRun, compileSubmit };
