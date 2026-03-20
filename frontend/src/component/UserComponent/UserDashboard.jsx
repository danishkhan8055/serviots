import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-fuchsia-200">
  
  <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-fuchsia-200 text-center w-full max-w-md">
    
   

    {/* Welcome */}
    <h1 className="text-3xl font-bold text-fuchsia-600 mb-2">
      Welcome 
    </h1>

    {/* Username */}
    <p className="text-gray-600 mb-6">

      <span className="block text-2xl font-semibold text-gray-800">
        {user?.name.toUpperCase()}
      </span>
    </p>

    {/* Divider */}
    <div className="h-px bg-fuchsia-100 mb-6"></div>

    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="w-full  bg-fuchsia-500 text-white py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
    >
      Logout
    </button>
  </div>
</div>
  );
};

export default UserDashboard;