import { TaskSchema } from "../model/task-model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ status: false, message: "Title is required" });
    }

    const newTask = await TaskSchema.create({
      title,
      description,
      status: status || "pending",
      userId: req.user.id,
    });

    return res.status(201).json({ status: true, data: newTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskSchema.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ status: true, data: tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await TaskSchema.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ status: false, message: "Task not found" });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ status: false, message: "Not authorized" });
    }

    const { title, description, status } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    await task.save();

    return res.status(200).json({ status: true, data: task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await TaskSchema.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ status: false, message: "Task not found" });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ status: false, message: "Not authorized" });
    }

    await task.deleteOne();

    return res.status(200).json({ status: true, message: "Task deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
