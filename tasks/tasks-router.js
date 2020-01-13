const express = require("express");
const db = require("../data/db");
const router = express.Router();


router.get("/", (req, res) => {
  db("tasks as t")
    .join("projects as p", "t.project_id", "p.id")
    .select("t.id", "t.description", "t.notes", "p.project_name", "p.description as project_description", "t.completed")
    .then(tasks => {
      tasks.forEach(task => {
        task.completed ? task.completed = 'true' : task.completed = 'false'
      });
      res.json(tasks)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to retrieve tasks" });
    });
});

router.post("/", (req, res) => {
  const taskData = req.body;
  db("tasks")
    .insert(taskData)
    .then(ids => {
      db("tasks")
        .where({ id: ids[0] })
        .then(newTaskEntry => {
          newTaskEntry.forEach(task => {
            task.completed ? task.completed = 'true' : task.completed = 'false'
          });
          res.status(201).json(newTaskEntry);
        });
    })
    .catch(err => {
      console.log("POST error", err);
      res.status(500).json({ message: "Failed to store data" });
    });
});

module.exports = router;
