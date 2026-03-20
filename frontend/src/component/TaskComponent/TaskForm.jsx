import { memo } from "react";

const TaskForm = ({
  form,
  setForm,
  handleSubmit,
  editingId,
  resetForm,
  creating,
  updating,
  statusOptions,
}) => {
  return (
    <form className="space-y-4 mb-8" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 outline-none transition"
          value={form.title}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Title"
        />

        <select
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 outline-none transition"
          value={form.status}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          {statusOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <textarea
        rows="3"
        className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 outline-none transition"
        value={form.description}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, description: e.target.value }))
        }
        placeholder="Description"
      />

      <button className="w-full bg-fuchsia-600 text-white py-2 rounded-lg">
        {editingId
          ? updating
            ? "Updating..."
            : "Update Task"
          : creating
            ? "Creating..."
            : "Create Task"}
      </button>

      {editingId && (
        <button
          type="button"
          onClick={resetForm}
          className="w-full border border-fuchsia-600 text-fuchsia-600 py-2 rounded-lg"
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default memo(TaskForm);
