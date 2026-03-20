import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2">Unauthorized Access</h2>
      <p className="text-gray-600 mb-6">
        You don’t have permission to view this page.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          Go Back
        </button>

        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;