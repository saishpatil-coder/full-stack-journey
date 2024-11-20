import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "todolist",
  password: "Sai1234@@",
  port: 3000,
});
db.connect();
const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];
async function getitems() {
  let q = "SELECT * FROM items";
  items = (await db.query(q)).rows;
  console.log(items);
}

app.get("/", async (req, res) => {
  await getitems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  const result = await db.query("INSERT INTO items (title) VALUES ($1)", [
    item,
  ]);
  console.log(result);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const { updatedItemId, updatedItemTitle } = req.body;
  console.log(updatedItemId, updatedItemTitle);
  const result = await db.query("UPDATE items SET title = $1 WHERE id = $2", [
    updatedItemTitle,
    updatedItemId,
  ]);
  console.log(result);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  const result = await db.query("DELETE FROM items WHERE id = $1", [id]);
  console.log(result);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
