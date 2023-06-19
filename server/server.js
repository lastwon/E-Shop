import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "comments",
});

app.get("/:productName", (req, res) => {
  const { productName } = req.params;
  const sql = "SELECT * FROM comments WHERE product_name = ?";
  db.query(sql, [productName], (err, result) => {
    if (err) {
      console.error("Error retrieving comments:", err);
      return res.status(500).json({ message: "Failed to retrieve comments" });
    }
    return res.json(result);
  });
});

app.post("/:productName", (req, res) => {
  const { name, comment, productName } = req.body;
  const sql =
    "INSERT INTO comments (name, comment, product_name) VALUES (?, ?, ?)";
  db.query(sql, [name, comment, productName], (err, result) => {
    if (err) {
      console.error("Error inserting comment:", err);
      return res.status(500).json({ message: "Failed to insert comment" });
    }
    console.log("Comment inserted successfully");
    res.status(200).json({ message: "Comment submitted successfully" });
  });
});

app.listen(8081, () => {
  console.log("Listening");
});
