import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../../redux/api/taskApi";

import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const statusOptions = ["pending", "in-progress", "done"];

const TaskDashboard = () => {
  const navigate = useNavigate();
  const user = useMemo(() => JSON.parse(sessionStorage.getItem("user")) || {}, []);

  const { data: taskData, isLoading: loadingTasks, error: tasksError, refetch } =
    useGetTasksQuery();

  const [createTask, { isLoading: creating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: updating }] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (tasksError) toast.error("Unable to load tasks");
  }, [tasksError]);

  const tasks = taskData?.data || [];

  const resetForm = () => {
    setForm({ title: "", description: "", status: "pending" });
    setEditingId(null);
  };

  // Add Task
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      if (editingId) {
        await updateTask({ id: editingId, data: form }).unwrap();
        toast.success("Task updated");
      } else {
        await createTask(form).unwrap();
        toast.success("Task created");
      }
      resetForm();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Task action failed");
    }
  },[createTask , editingId , form , refetch , updateTask])

  // Edit Task
  const handleEdit = useCallback((task) => {
    setEditingId(task._id);
    setForm({
      title: task.title,
      description: task.description || "",
      status: task.status,
    });
  },[])

  // Delete 
  const handleDelete = useCallback(async (id) => {
    try {
      await deleteTask(id).unwrap();
      toast.success("Task deleted");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  },[deleteTask , refetch])

  // Logout
  const handleLogout = useCallback(() => {
    sessionStorage.clear();
    navigate("/login");
  },[navigate])

  return (
    <div className="min-h-screen bg-fuchsia-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-3xl shadow-md">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-fuchsia-600">
            Hello, {user?.name || "User"}
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Form */}
        <TaskForm
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          editingId={editingId}
          resetForm={resetForm}
          creating={creating}
          updating={updating}
          statusOptions={statusOptions}
        />

        {/* List */}
        <TaskList
          tasks={tasks}
          loading={loadingTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default TaskDashboard;