const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config.env" });

mongoose.connect(
  "mongodb://localhost:27017/todo-demo?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.error("mongoDB Connection Error!", err);
    }
    console.log("mongoDB Connected!");
  }
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const ToDoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: String,
  createAt: { type: Date, default: Date.now() },
});

const toDo = mongoose.model("ToDo", ToDoSchema);

//Create To-Do
app.post("/", (req, res) => {
  const { title, description, createdBy } = req.body;

  const toDoAdd = new toDo({
    title: title,
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
app.get("/todos", (req, res) => {
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
app.get("/todos/:todo_id", (req, res) => {
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
app.patch("/todos/:todo_id", (req, res) => {
  const { todo_id } = req.params;

  const { title, description, createdBy } = req.body;

  toDo.findByIdAndUpdate(
    todo_id,
    {
      title: title,
      description: description,
      createdBy: createdBy,
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
app.delete("/todos/:todo_id", (req, res) => {
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
app.delete("/todos", (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
