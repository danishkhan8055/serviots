import { memo } from "react";

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 p-5 flex flex-col justify-between">
      
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {task.title}
        </h3>

        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {task.description}
        </p>

        <span
          className={`inline-block mt-3 text-xs font-medium px-3 py-1 rounded-full ${
            task.status === "done"
              ? "bg-green-100 text-green-600"
              : task.status === "pending"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 text-sm rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
        >
          ✏️ Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="px-3 py-1 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default memo(TaskCard);