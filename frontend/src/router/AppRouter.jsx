import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "../middleware/ProtectedRoute";

// Lazy imports
const Register = lazy(() => import("../component/UserComponent/Register"));
const Login = lazy(() => import("../component/UserComponent/Login"));
const TaskDashboard = lazy(() => import("../component/TaskComponent/TaskDashboard"));
const AdminDashboard = lazy(() => import("../component/Admin/AdminDashboard"));
const EditUser = lazy(() => import("../component/Admin/EditUser"));
const Unauthorized = lazy(() => import("../common/Unauthorized"));

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* User + Admin */}
        <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
          <Route path="/user-dashboard" element={<TaskDashboard />} />
        </Route>

        {/* Admin Only */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/edit/:id" element={<EditUser />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;