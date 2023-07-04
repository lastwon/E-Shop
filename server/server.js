import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pool from "./db.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, "public")));

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get("/api/:productName", (req, res) => {
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

app.post("/api/:productName", (req, res) => {
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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

export default app;
