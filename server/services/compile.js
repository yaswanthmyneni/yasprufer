import axios from "axios";
import "dotenv/config";

const COMPILE_BASE_URL =
  process.env.COMPILE_URL || `${process.env.COMPILER_URL}`;

const runCode = (data) => {
  console.log(`${COMPILE_BASE_URL}/run`);
  return axios.post(`${COMPILE_BASE_URL}/run`, data);
};

const submitCode = (data) => {
  return axios.post(`${COMPILE_BASE_URL}/submit`, data);
};

export { runCode, submitCode };
