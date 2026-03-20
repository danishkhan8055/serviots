import { useCallback, useEffect, useState } from "react";
import { useGetUsersQuery } from "../../redux/api/userApi";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/Loader";

const AdminDashboard = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role] = useState("");
  const [debounceSearch, setDebounceSearch] = useState();
  const navigate = useNavigate();

  const { data, isLoading } = useGetUsersQuery({
    page,
    limit: 2,
    search: debounceSearch,
    role,
  });

  //debounce logic
  useEffect(() => {
    const result = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);
    return () => clearTimeout(result);
  }, [search]);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);
  if (isLoading) return <p className="text-center mt-10"><Loader/></p>;

  return (
    <div className="min-h-screen bg-fuchsia-50 p-8">
      {/* Heading */}
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold text-fuchsia-600 mb-6">
          Admin Dashboard
        </h2>
        <span
          onClick={handleLogout}
          className="text-red-500 font-medium cursor-pointer hover:text-red-600 hover:underline transition"
        >
          Logout
        </span>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border border-fuchsia-200 px-4 py-2 rounded-lg w-full md:w-72 focus:ring-2 focus:ring-fuchsia-400 outline-none"
        />
      </div>

      {/* Table Card */}
      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden border border-fuchsia-200">
        <table className="w-full text-left">
          {/* Head */}
          <thead className="bg-fuchsia-100 text-fuchsia-700">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Created</th>
              <th className="p-4">ACtion</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data?.data?.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-fuchsia-50 transition"
              >
                {/* User with avatar */}
                <td className="p-4 flex items-center gap-3">
                  <span className="capitalize font-medium">{user.name}</span>
                </td>

                <td className="p-4 text-gray-600">{user.email}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-4 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => navigate(`/admin/edit/${user._id}`)}
                    className="bg-blue-100 text-orange-600 px-3 py-1 rounded-lg text-sm hover:bg-blue-200"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-fuchsia-200 text-fuchsia-700 rounded-lg hover:bg-fuchsia-300 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-medium text-gray-700">
          Page {data?.currentPage} of {data?.totalPages}
        </span>

        <button
          disabled={page === data?.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-fuchsia-200 text-fuchsia-700 rounded-lg hover:bg-fuchsia-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
