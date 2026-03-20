import { memo } from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 animate-pulse">
        Loading tasks...
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No tasks available. Add one 🚀
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default memo(TaskList);