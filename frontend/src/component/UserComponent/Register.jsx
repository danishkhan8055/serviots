import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const onSubmit = useCallback(
    async (data) => {
      try {
        await registerUser(data).unwrap();

        toast.success("User Registered Successfully");
        navigate("/login");
        reset();
      } catch (error) {
        toast.error(error?.data?.message || "Registration Failed");
      }
    },
    [navigate, registerUser, reset]
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-fuchsia-100 via-white to-fuchsia-200">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-fuchsia-200">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-fuchsia-600">
          Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="w-full px-4 py-2 border border-fuchsia-200 rounded-lg focus:ring-2 focus:ring-fuchsia-400 outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              type="email"
              className="w-full px-4 py-2 border border-fuchsia-200 rounded-lg focus:ring-2 focus:ring-fuchsia-400 outline-none"
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              type="password"
              className="w-full px-4 py-2 border border-fuchsia-200 rounded-lg focus:ring-2 focus:ring-fuchsia-400 outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Mobile Number
            </label>
            <input
              {...register("phone", {
                required: "Mobile number required",
                minLength: { value: 10, message: "Enter 10 digit number" },
                maxLength: { value: 10, message: "Enter 10 digit number" },
              })}
              type="tel"
              className="w-full px-4 py-2 border border-fuchsia-200 rounded-lg focus:ring-2 focus:ring-fuchsia-400 outline-none"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-fuchsia-600 text-white py-2 rounded-lg font-semibold hover:bg-fuchsia-700 transition disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-fuchsia-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;