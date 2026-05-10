import { useContext, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { CodeModal } from "./CodeModal";
import { api } from "../api";
import { AuthContext } from "../context/AuthContext";
import { AuthModal } from "./AuthModal";

const Compiler = ({ problemId }) => {
  const { user } = useContext(AuthContext);
  const [code, setCode] = useState(`// C++ program
#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}`);
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLanguage = (e) => {
    setLanguage(e.target.value);
    switch (e.target.value) {
      case "javascript":
        setCode(`// javascript program
console.log("Hello, World!");`);
        break;
      case "python":
        setCode(`# python program
print("Hello, World!")`);
        break;
      default:
        setCode(`// C++ program
#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}`);
    }
  };

  const handleSubmit = async () => {
    let lang = "";
    if (language === "javascript") {
      lang = "js";
    } else if (language === "python") {
      lang = "py";
    } else {
      lang = "cpp";
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/compile/submit`,
        {
          problemId,
          lang,
          code,
        },
        {
          withCredentials: true,
        },
      );

      if (data.allPassed) {
        alert("Code submitted successfully!");
      } else {
        alert("Code submission failed!");
      }
    } catch (error) {
      console.log(error?.response?.data || error.message);
    }
  };

  const handleRun = async () => {
    let lang = "";
    if (language === "javascript") {
      lang = "js";
    } else if (language === "python") {
      lang = "py";
    } else {
      lang = "cpp";
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/compile/run`,
        {
          problemId,
          lang,
          code,
          input,
        },
        {
          withCredentials: true,
        },
      );

      setOutput(data.output);
    } catch (error) {
      console.log(error?.response?.data || error.message);
    }
  };

  const handleAnalyze = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    if (!code.trim()) return;

    try {
      setAnalyzing(true);

      const res = await api.post(`/ai/code-analysis`, {
        prompt: `
Language: ${language}

Code:
${code}

Analyze this code and provide:
- Explanation
- Bugs (if any)
- Improvements
`,
      });

      setAnalysis(res.data.reply);
      setShowAnalysis(true);
    } catch (err) {
      console.log(err?.response?.data || err.message);
      setAnalysis("Error analyzing code");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Code Editor
      </h1>
      <select
        value={language}
        onChange={(e) => handleLanguage(e)}
        className="w-[10rem] border p-2 rounded focus:ring-2 focus:ring-blue-500"
      >
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="javascript">Javascript</option>
      </select>
      <div className="border rounded overflow-hidden h-[400px]">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
        />
      </div>
      <textarea
        placeholder="Input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 rounded h-24 resize-none focus:ring-2 focus:ring-blue-500"
      />
      {output && (
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
          {output}
        </pre>
      )}
      <AuthModal
        showAuthModal={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
      <CodeModal
        analysis={showAnalysis ? analysis : null}
        onClose={() => setShowAnalysis(false)}
      />
      <button
        onClick={handleAnalyze}
        disabled={analyzing}
        className={`w-[12rem] py-2 rounded text-white transition ${
          analyzing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700 cursor-pointer"
        }`}
      >
        {analyzing ? "Analyzing..." : "Analyze Code"}
      </button>
      <div>
        <button
          onClick={handleRun}
          className="w-[20rem] border border-black-500 py-2 rounded hover:border-blue-600 transition cursor-pointer"
        >
          Run
        </button>
        <button
          onClick={handleSubmit}
          className="w-[20rem] ml-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export { Compiler };
