import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApi";
import toast from "react-hot-toast";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetUsersQuery({});
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Prefill data
  useEffect(() => {
    if (data?.data) {
      const user = data.data.find((u) => u._id === id);
      if (user) {
        reset({
          name: user.name,
          email: user.email,
          phone: user.phone,
          isActive: user.isActive,
        });
      }
    }
  }, [data, id, reset]);

  // Submit
  const onSubmit = useCallback(
    async (formValues) => {
      try {
        await updateUser({ id, data: formValues }).unwrap();

        toast.success("User updated successfully");
        navigate("/admin-dashboard");
      } catch (error) {
        toast.error(error?.data?.message || "Update failed");
      }
    },
    [id, navigate, updateUser]
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-fuchsia-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-fuchsia-600">
          Edit User
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-400 outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-400 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Mobile Number
            </label>
            <input
              {...register("phone", { required: "Phone is required" })}
              type="tel"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-fuchsia-400 outline-none"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Active */}
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-600">Active</label>
            <input
              type="checkbox"
              {...register("isActive")}
              className="w-5 h-5 accent-fuchsia-600"
            />
          </div>

          {/* Buttons */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full bg-gray-400 text-white py-2 rounded-lg"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-fuchsia-600 text-white py-2 rounded-lg"
          >
            {isLoading ? "Updating..." : "Update User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;