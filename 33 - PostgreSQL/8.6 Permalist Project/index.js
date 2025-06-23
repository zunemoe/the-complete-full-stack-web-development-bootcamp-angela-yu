import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const { Pool } = pg;
const pool = new Pool({
  user: "zunemoe",
  host: "localhost",
  database: "permalist",
  password: "12345",
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

async function getItems() {
  try {
    const result = await pool.query("SELECT * FROM items ORDER BY id ASC");
    console.log("Items:", result.rows);
    items = result.rows.map((row) => ({ id: row.id, title: row.title }));
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).send("Internal Server Error");
  }
}

async function addItem(item) {  
  try {    
    const result = await pool.query("INSERT INTO items (title) VALUES ($1) RETURNING *", [item.title]);
    console.log("Item added:", result.rows[0]);
    
    if (result.rows.length > 0) {
      const newItem = { id: result.rows[0].id, title: result.rows[0].title };
      items.push(newItem);
    }
  } catch (err) {
    console.error("Error adding item:", err);
    res.render("index.ejs", { error: "Failed to add item. Please try again.",});
  } 
}

async function editItem(item) {
  try {
    const result = await pool.query("UPDATE items SET title = $1 WHERE id = $2 RETURNING *", [item.title, item.id]);
    console.log("Item edited:", result.rows[0]);
    
    if (result.rows.length > 0) {
      const updatedItem = { id: result.rows[0].id, title: result.rows[0].title };
      items = items.map(i => i.id === updatedItem.id ? updatedItem : i);
    } 
  } catch (err) {
    console.error("Error editing item:", err);
    res.render("index.ejs", { error: "Failed to edit item. Please try again.", });
  }
}

async function deleteItem(itemId) {
  try {
    const result = await pool.query("DELETE FROM items WHERE id = $1 RETURNING *", [itemId]);
    console.log("Item deleted:", result.rows[0]);
    
    if (result.rows.length > 0) {
      const deletedItem = result.rows[0];
      items = items.filter(i => i.id !== deleteItem.id);
    }
  } catch (err) {
    console.error("Error deleting item:", err);
    res.render("index.ejs", { error: "Failed to delete item. Please try again.", });
  }
}

app.get("/", async (req, res) => {
  // Get items from the database
  await getItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  // Add a new item to the database
  addItem({ title: req.body.newItem });
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  editItem({ id: req.body.updatedItemId, title: req.body.updatedItemTitle });
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  // Delete an item from the database
  deleteItem(req.body.deleteItemId);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
