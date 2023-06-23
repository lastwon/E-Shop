import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});

app.get("/:productName", (req, res) => {
  const { productName } = req.params;
  const sql =
    "SELECT * FROM comments WHERE product_name = ? ORDER BY createdAt DESC";

  pool.query(sql, [productName], (err, result) => {
    if (err) {
      console.error("Error retrieving comments:", err);
      return res.status(500).json({ message: "Failed to retrieve comments" });
    }
    return res.json(result);
  });
});

app.post("/:productName", (req, res) => {
  const { name, comment, productName, rating } = req.body;
  const commentSql =
    "INSERT INTO comments (name, comment, product_name, rating) VALUES (?, ?, ?, ?)";

  pool.query(
    commentSql,
    [name, comment, productName, rating],
    (err, commentResult) => {
      if (err) {
        console.error("Error inserting comment:", err);
        return res.status(500).json({ message: "Failed to insert comment" });
      }

      console.log("Comment inserted successfully");
      res.status(200).json({ message: "Comment submitted successfully" });
    }
  );
});
