import React, { useCallback, useState } from "react";
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
  const [preview, setPreview] = useState(null);

  const [registerUser, { isLoading }] = useRegisterMutation();

  const onSubmit =  useCallback( async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phone", data.phone);
      formData.append("profileImage", data.image[0]);

      await registerUser(formData).unwrap();

      toast.success("User Registered Successfully");
      navigate("/login");
      reset();
    } catch (error) {
      toast.error(error?.data?.message || "Registration Failed");
    }
  },[navigate , registerUser,reset])

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-fuchsia-100 via-white to-fuchsia-200">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-fuchsia-200">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6 text-fuchsia-600">
          Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {preview && (
            <div className="mt-3 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-fuchsia-400"
              />
            </div>
          )}
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Profile Image
            </label>
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="w-full text-sm border border-fuchsia-200 rounded-lg p-2 file:bg-fuchsia-600 file:text-white file:border-0 file:px-4 file:py-1 file:rounded-md"
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              First Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="w-full px-4 py-2 border border-fuchsia-200 rounded-lg focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 outline-none transition"
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must not exceed 20 characters",
                },
              })}
              type="password"
              className="w-full px-4 py-2 border border-fuchsia-200 rounded-lg focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 outline-none transition"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Mobile Number
            </label>
            <input
              {...register("phone", {
                required: "Mobile number required",
                minLength: {
                  value: 10,
                  message: "Mobile number must be 10 digit",
                },
                maxLength: {
                  value: 10,
                  message: "Mobile number must be 10 digit",
                },
              })}
              type="tel"
              className="w-full px-4 py-2 border border-fuchsia-200 rounded-lg focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 outline-none transition"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-fuchsia-600 text-white py-2 rounded-lg font-semibold hover:bg-fuchsia-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
