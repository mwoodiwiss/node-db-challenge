const express = require("express");
const db = require("../data/db");
const router = express.Router();

router.get("/", (req, res) => {
  db("projects")
    .then(projects => {
      projects.forEach(project => {
        project.completed
          ? (project.completed = "true")
          : (project.completed = "false");
      });
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve projects" });
    });
});

router.post("/", (req, res) => {
  const projectData = req.body;
  db("projects")
    .insert(projectData)
    .then(ids => {
      db("projects")
        .where({ id: ids[0] })
        .then(newProjectEntry => {
          newProjectEntry.forEach(project => {
            project.completed
              ? (project.completed = "true")
              : (project.completed = "false");
          });
          res.status(201).json(newProjectEntry);
        });
    })
    .catch(err => {
      console.log("POST error", err);
      res.status(500).json({ message: "Failed to store data" });
    });
});

module.exports = router;
