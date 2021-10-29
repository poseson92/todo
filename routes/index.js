const express = require("express");
const toDo = require("../models/user");
const router = express.Router();

// Create To-Do
router.post("/", (req, res) => {
  const { title, checkbox, description, createdBy } = req.body;

  const toDoAdd = new toDo({
    title: title,
    checkbox: checkbox,
    description: description,
    createdBy: createdBy,
  });

  toDoAdd.save((err, todo) => {
    if (err) {
      res.status(500).json({
        err,
      });
    } else {
      res.status(201).json({
        message: "To-Do has been created",
        todo,
      });
    }
  });
});

//View To-Do
router.get("/todos", (req, res) => {
  toDo.find({}, (err, toDos) => {
    if (err) {
      res.status(500).json({
        err,
      });
    } else {
      res.status(200).json({
        message: "All ToDos",
        toDos,
      });
    }
  });
});

//View Single To-Do
router.get("/todos/:todo_id", (req, res) => {
  const { todo_id } = req.params;

  toDo.findById(todo_id, (err, toDo) => {
    if (err) {
      res.status(500).json({
        err,
      });
    } else {
      res.status(200).json({
        message: "To-Do",
        toDo,
      });
    }
  });
});

//Update Single To-Do
router.patch("/todos/:todo_id", (req, res) => {
  const { todo_id } = req.params;

  const { title, checkbox, description, createdBy } = req.body;

  toDo.findByIdAndUpdate(
    todo_id,
    {
      title: title,
      checkbox: checkbox,
      // description: description,
      // createdBy: createdBy,
    },
    (err, toDo) => {
      if (err) {
        res.status(500).json({
          err,
        });
      } else {
        res.status(200).json({
          message: "To-Do updated",
          toDo,
        });
      }
    }
  );
});

//Remove Single To-Do
router.delete("/todos/:todo_id", (req, res) => {
  const { todo_id } = req.params;

  toDo.findByIdAndDelete(todo_id, (err, toDo) => {
    if (err) {
      res.status(500).json({
        err,
      });
    } else {
      res.status(200).json({
        message: "To-Do has been removed",
        toDo,
      });
    }
  });
});

//Remove all To-Do
router.delete("/todos", (req, res) => {
  toDo.remove({}, (err, toDo) => {
    if (err) {
      res.status(500).json({
        err,
      });
    } else {
      res.status(200).json({
        message: "All To-Do has been removed",
        toDo,
      });
    }
  });
});

module.exports = router;
