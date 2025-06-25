import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "secrets",
    password: "12345",
    port: 5432,
});

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering user");
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, password]);
    if (result.rows.length > 0) {
      res.render("secrets.ejs");
    } else {
      res.send("Invalid credentials. Please try again.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error logging in");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
