import React, { useState } from "react";
import axios from "axios";

const CreateProblem = () => {
  const [form, setForm] = useState({
    title: "",
    statement: "",
    constraints: "",
    difficulty: "easy",
    sampleInput: "",
    sampleOutput: "",
  });

  const [testcases, setTestcases] = useState([{ input: "", output: "" }]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTestcaseChange = (index, field, value) => {
    const updated = [...testcases];
    updated[index][field] = value;
    setTestcases(updated);
  };

  const addTestcase = () => {
    setTestcases([...testcases, { input: "", output: "" }]);
  };

  const removeTestcase = (index) => {
    const updated = testcases.filter((_, i) => i !== index);
    setTestcases(updated);
  };

  const handleCreateProblem = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!form.title.trim()) newErrors.title = true;
    if (!form.statement.trim()) newErrors.statement = true;
    if (!form.constraints.trim()) newErrors.constraints = true;
    if (!form.sampleInput.trim()) newErrors.sampleInput = true;
    if (!form.sampleOutput.trim()) newErrors.sampleOutput = true;

    testcases.forEach((tc, i) => {
      if (!tc.input.trim()) newErrors[`tc-input-${i}`] = true;
      if (!tc.output.trim()) newErrors[`tc-output-${i}`] = true;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/problem/create`,
        {
          ...form,
          testcases,
        },
        { withCredentials: true },
      );

      console.log(res.data);
      alert("problem created successfully!");
    } catch (err) {
      console.error(err);
      alert("error while creating a problem!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-10">
      <div className="w-full max-w-3xl bg-gray-100 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Create Problem
        </h2>

        <form onSubmit={handleCreateProblem} className="space-y-4">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className={`w-full border rounded-lg p-2 bg-white focus:outline-none focus:ring-1 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />

          <textarea
            name="statement"
            placeholder="Problem Statement"
            value={form.statement}
            onChange={handleChange}
            rows={4}
            className={`w-full border rounded-lg p-2 bg-white focus:outline-none focus:ring-1 ${
              errors.statement ? "border-red-500" : "border-gray-300"
            }`}
          />

          <textarea
            name="constraints"
            placeholder="Constraints (e.g. 1 <= n <= 10^5)"
            value={form.constraints}
            onChange={handleChange}
            rows={3}
            className={`w-full border rounded-lg p-2 bg-white focus:outline-none focus:ring-1 ${
              errors.constraints ? "border-red-500" : "border-gray-300"
            }`}
          />

          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="w-full cursor-pointer rounded-lg p-2 bg-white focus:outline-none"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <textarea
            name="sampleInput"
            placeholder="Sample Input"
            value={form.sampleInput}
            onChange={handleChange}
            rows={3}
            className={`w-full border rounded-lg p-2 bg-white focus:outline-none focus:ring-1 font-mono ${
              errors.sampleInput ? "border-red-500" : "border-gray-300"
            }`}
          />

          <textarea
            name="sampleOutput"
            placeholder="Sample Output"
            value={form.sampleOutput}
            onChange={handleChange}
            rows={3}
            className={`w-full border rounded-lg p-2 bg-white focus:outline-none focus:ring-1 font-mono ${
              errors.sampleOutput ? "border-red-500" : "border-gray-300"
            }`}
          />

          <h3 className="text-lg font-semibold mt-6">Testcases</h3>

          {testcases.map((tc, index) => (
            <div
              key={index}
              className="rounded-lg p-4 bg-white space-y-3"
            >
              <textarea
                placeholder="Input"
                value={tc.input}
                onChange={(e) =>
                  handleTestcaseChange(index, "input", e.target.value)
                }
                rows={3}
                className={`w-full border rounded-lg p-2 bg-white focus:outline-none focus:ring-1 font-mono ${
                  errors[`tc-input-${index}`]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              <textarea
                placeholder="Output"
                value={tc.output}
                onChange={(e) =>
                  handleTestcaseChange(index, "output", e.target.value)
                }
                rows={2}
                className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-1 font-mono ${
                  errors[`tc-output-${index}`]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => removeTestcase(index)}
                  className="text-red-500 cursor-pointer hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addTestcase}
            className="w-full bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-lg py-2"
          >
            + Add Testcase
          </button>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white cursor-pointer rounded-lg py-2 hover:bg-blue-700 transition"
          >
            Create Problem
          </button>
        </form>
      </div>
    </div>
  );
};

export { CreateProblem };
