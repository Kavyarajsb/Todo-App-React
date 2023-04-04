const express = require("express");
const cors = require("cors");
const pgp = require("pg-promise")();
const app = express();
const PORT = process.env.PORT || 8000;

// Database connection
const connectionUrl = "postgressql://postgres:kavya@localhost:5432/todos";
const db = pgp(connectionUrl);

db.any("SELECT * FROM todo")
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());
app.use(express.json());



app.post("/todo", async (req, res) => {
  const { text } = req.body;
  await db
    .one("INSERT INTO todo (text) VALUES ($1) RETURNING *", [text])
    .then((data) => {
      res.status(201).json({ id: data.id, text });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error adding todo" });
    });
});

app.get("/todos", async (req, res) => {
  await db
    .any("SELECT * FROM todo")
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error creating todo" });
    });
});

app.put("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  await db
    .result("UPDATE todo SET text = $1 WHERE id = $2 RETURNING *", [text, id])
    .then((data) => {
      if (data.rowCount > 0) {
        res.json({ id, text });
      } else {
        res.status(404).json({ message: `Todo with id ${id} not found` });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error updating todo" });
    });
});

app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  await db
    .result("DELETE FROM todo WHERE id = $1 RETURNING *", [id])
    .then((data) => {
      if (data.rowCount > 0) {
        res.json({ message: `Deleted todo with id ${id}` });
      } else {
        res.status(404).json({ message: `Todo with id ${id} not found` });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error deleting todo" });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
