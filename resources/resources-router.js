const express = require("express");
const db = require("../data/db")
const router = express.Router();

router.get("/", (req, res) => {
  db("resources")
    .then(resources => {
      res.json(resources);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve resources" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("resources")
    .where({ id })
    .then(resources => {
      res.json(resources);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve resource" });
    });
});

router.post("/", (req, res) => {
  const resourceData = req.body;
  db("resources")
    .insert(resourceData)
    .then(ids => {
      db("resources")
        .where({ id: ids[0] })
        .then(newResourceEntry => {
          res.status(201).json(newResourceEntry);
        });
    })
    .catch(err => {
      console.log("POST error", err);
      res.status(500).json({ message: "Failed to store data" });
    });
});

module.exports = router;
