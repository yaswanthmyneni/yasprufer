import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex flex-col items-center justify-center text-center py-14 px-6">
        <h2 className="text-6xl font-extrabold text-gray-700 leading-tight">
          Practice Coding <br />
          <span className="text-blue-400">Like a Pro</span>
        </h2>

        <p className="mt-6 text-gray-400 max-w-2xl text-lg">
          Solve coding challenges, compete with developers, improve your
          problem-solving skills, and prepare for technical interviews.
        </p>

        <div className="mt-10">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 cursor-pointer rounded-xl text-lg font-semibold"
            onClick={() => navigate("/problem")}
          >
            Start Solving
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 py-10">
        <div className="bg-gray-100 p-8 rounded-2xl shadow-lg">
          <h3 className="text-4xl text-gray-700 font-bold">5+</h3>
          <p className="text-gray-400 mt-2">Coding Problems</p>
        </div>

        <div className="bg-gray-100 p-8 rounded-2xl shadow-lg">
          <h3 className="text-4xl text-gray-700 font-bold">1K+</h3>
          <p className="text-gray-400 mt-2">Active Users</p>
        </div>

        <div className="bg-gray-100 p-8 rounded-2xl shadow-lg">
          <h3 className="text-4xl text-gray-700 font-bold">24/7</h3>
          <p className="text-gray-400 mt-2">Code Execution</p>
        </div>
      </div>
    </section>
  );
};

export { Home };
