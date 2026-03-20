import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/api/userApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginUser, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = useCallback(async (data) => {
    try {
      const res = await loginUser(data).unwrap();

      sessionStorage.setItem("token", res?.token);
      sessionStorage.setItem("user", JSON.stringify(res?.data));

      toast.success("Login Successful");

      // Role-based redirect
      if (res?.data?.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }

    } catch (error) {
      toast.error(error?.data?.message || "Login Failed");
    }
  },[loginUser , navigate])

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-fuchsia-100 via-white to-fuchsia-200">
  <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-fuchsia-200">
    
    {/* Heading */}
    <h2 className="text-3xl font-bold text-center mb-6 text-fuchsia-600">
      Login Here !!
    </h2>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-600">
          Email
        </label>
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          className="w-full px-4 py-2 border border-fuchsia-200 rounded-lg focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 outline-none transition"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-600">
          Password
        </label>
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          className="w-full px-4 py-2 border border-fuchsia-200 rounded-lg focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 outline-none transition"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-fuchsia-600 text-white py-2 rounded-lg font-semibold hover:bg-fuchsia-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>

    {/* Register Link */}
    <p className="text-sm text-center mt-5 text-gray-600">
      Don’t have an account?{" "}
      <span
        onClick={() => navigate("/")}
        className="text-fuchsia-600 font-semibold hover:underline cursor-pointer"
      >
        Register
      </span>
    </p>
  </div>
</div>
  );
};

export default Login;