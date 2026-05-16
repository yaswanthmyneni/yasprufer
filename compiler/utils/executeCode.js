import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const outputPath = path.join(process.cwd(), "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const TIME_LIMIT = 5000;
const MAX_OUTPUT = 1024 * 1024;

const executeCode = (filepath, inputFilePath) => {
  return new Promise(async (resolve, reject) => {
    const [jobId, lang] = path.basename(filepath).split(".");

    const executablePath = path.join(outputPath, `${jobId}.out`);

    let finished = false;

    const safeReject = (err) => {
      if (finished) return;
      finished = true;
      reject(err);
    };

    const safeResolve = (data) => {
      if (finished) return;
      finished = true;
      resolve(data);
    };

    try {
      if (lang === "cpp") {
        await compileCpp(filepath, executablePath);
      }

      let runCommand;
      let runArgs;

      if (lang === "py") {
        runCommand = "python3";
        runArgs = [filepath];
      } else if (lang === "js") {
        runCommand = "node";
        runArgs = [filepath];
      } else {
        runCommand = executablePath;
        runArgs = [];
      }

      const child = spawn(runCommand, runArgs);

      const inputStream = fs.createReadStream(inputFilePath);
      inputStream.pipe(child.stdin);

      let stdout = "";
      let stderr = "";

      child.stdout.on("data", (data) => {
        stdout += data.toString();

        if (stdout.length > MAX_OUTPUT) {
          child.kill("SIGKILL");
          safeResolve({
            type: "OUTPUT_LIMIT",
            message: "Output Limit Exceeded",
          });
        }
      });
      child.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      const timer = setTimeout(() => {
        child.kill("SIGKILL");

        safeResolve({
          type: "TLE",
          message: "Time Limit Exceeded",
        });
      }, TIME_LIMIT);

      child.on("close", (code) => {
        clearTimeout(timer);

        if (finished) return;

        if (stderr && !stdout) {
          return safeResolve({
            type: "STDERR",
            message: stderr,
          });
        }

        if (code !== 0) {
          return safeResolve({
            type: "RUNTIME_ERROR",
            message: stderr || `Process exited with code ${code}`,
          });
        }

        safeResolve(stdout);
      });

      child.on("error", (err) => {
        clearTimeout(timer);

        safeResolve({
          type: "EXECUTION_ERROR",
          message: err.message,
        });
      });
    } catch (err) {
      safeReject(err);
    }
  });
};

const compileCpp = (filepath, executablePath) => {
  return new Promise((resolve, reject) => {
    const compiler = spawn("g++", [filepath, "-o", executablePath]);

    let compileError = "";

    compiler.stderr.on("data", (data) => {
      compileError += data.toString();
    });

    compiler.on("close", (code) => {
      if (code !== 0) {
        return reject({
          type: "COMPILATION_ERROR",
          message: compileError,
        });
      }

      resolve();
    });

    compiler.on("error", (err) => {
      reject({
        type: "COMPILER_ERROR",
        message: err.message,
      });
    });
  });
};

export { executeCode };
