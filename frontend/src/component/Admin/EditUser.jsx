import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUsersQuery, useUpdateUserMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const { data } = useGetUsersQuery({});
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // old data show logic
  useEffect(() => {
    if (data?.data) {
      const user = data.data.find((u) => u._id === id);
      if (user) {
        reset(user);
      }
    }
  }, [data, id, reset]);

  //preview image
  const user = data?.data?.find((u) => u._id === id);

  //api calling
  const onSubmit = useCallback(
    async (formValues) => {
      try {
        const formData = new FormData();

        // append all fields
        formData.append("name", formValues.name);
        formData.append("email", formValues.email);
        formData.append("lastName", formValues.lastName);
        formData.append("user_name", formValues.user_name);
        formData.append("phone", formValues.phone);
        formData.append("isActive", formValues.isActive);

        if (formValues.profileImage && formValues.profileImage[0]) {
          formData.append("profileImage", formValues.profileImage[0]);
        }

        await updateUser({ id, data: formData }).unwrap();

        toast.success("User updated successfully");
        navigate("/admin-dashboard");
      } catch (error) {
        console.log(error);
        toast.error("Update failed");
      }
    },
    [id, navigate, updateUser],
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-fuchsia-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-fuchsia-600">Edit User</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Preview Image */}
          <div className="mt-3 flex justify-center">
            {preview ? (
              <img
                src={preview}
                alt="New Preview"
                className="w-24 h-24 object-cover rounded-full border-2 border-fuchsia-400"
              />
            ) : user?.profileImage ? (
              <img
                src={user?.profileImage}
                alt="Old"
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
              />
            ) : null}
          </div>
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Profile Image
            </label>
            <input
              {...register("profileImage")}
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

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Last Name
            </label>
            <input
              {...register("lastName", { required: "Last Name is required" })}
              type="text"
              className="w-full px-4 py-2 border border-fuchsia-200 rounded-lg focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 outline-none transition"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Username
            </label>
            <input
              {...register("user_name", { required: "Username is required" })}
              type="text"
              className="w-full px-4 py-2 border border-fuchsia-200 rounded-lg focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 outline-none transition"
            />
            {errors.user_name && (
              <p className="text-red-500 text-sm">{errors.user_name.message}</p>
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
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-600">
              Active Status
            </label>

            <input
              type="checkbox"
              {...register("isActive")}
              className="w-5 h-5 accent-fuchsia-600 cursor-pointer"
            />
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

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full bg-gray-500 text-white py-2 rounded-lg mb-2"
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
