const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// get all tasks
router.get("/", async (req, res)=> {
  try {
    const tasks = await Task.find().sort({ createdAt : -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get tasks",
    });
  }
});

// Add task
router.post("/", async ( req, res )=>{
  try {
    const {title} = req.body;
      if(!title || !title.trim()){
        return res.status(400).json({
          message: "Task title is required",
        });
      }
      const task = await Task.create({
        title: title.trim()
      });
      res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

// update task
router.put("/:id", async ( req, res )=>{
    try {
      const { title } = req.body;
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { title },
        { new : true }
      );
      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({
      message: "Failed to update task",
    });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

module.exports = router;