import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Compiler } from "../components";

const SingleProblem = () => {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios(
          `${import.meta.env.VITE_SERVER_BASE_URL}/problem/${id}`,
          {
            withCredentials: true,
          },
        );

        if (!res.data.success) {
          throw new Error(data.message);
        }

        setProblem(res.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6 overflow-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {problem.title}
            </h2>

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                problem.difficulty === "easy"
                  ? "bg-green-100 text-green-700"
                  : problem.difficulty === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {problem.difficulty}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-1">Statement</h3>
            <p className="text-gray-700 bg-gray-100 p-3 rounded  whitespace-pre-wrap">
              {problem.statement.replace(/\\n/g, "\n")}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-1">Constraints</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap text-gray-700">
              {problem.constraints.replace(/\\n/g, "\n")}
            </pre>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-800">Input</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap">
              {problem?.sampleInput?.replace(/\\n/g, "\n")}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">Output</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
              {problem?.sampleOutput}
            </pre>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-4">
          <Compiler problemId={id} />
        </div>
      </div>
    </div>
  );
};

export { SingleProblem };
