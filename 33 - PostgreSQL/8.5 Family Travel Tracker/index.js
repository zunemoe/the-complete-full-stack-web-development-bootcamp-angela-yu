import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const { Pool } = pg;
const pool = new Pool({
  user: "zunemoe",
  host: "localhost",
  database: "world",
  password: "12345",
  port: 5432,
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


let currentUserId = 1;
let users = [];

async function getUsers() {
  const result = await pool.query("SELECT * FROM users");
  users = result.rows;
  console.log("Users:", users);
}

async function checkVisited(userid) {
  const result = await pool.query("SELECT country_code FROM visited_countries WHERE user_id = $1", [userid]);
  return result.rows.map((row) => row.country_code);
}

async function renderHome(res, userId) {
  await getUsers();
  const countries = await checkVisited(currentUserId);
  res.render("index.ejs", {
    countries,
    total: countries.length,
    users,
    currentUserId: userId,
    color: "teal",
  });
}

app.get("/", async (req, res) => {
  try {
    await renderHome(res, currentUserId);
  } catch (err) {
    console.error("Error rendering home:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/add", async (req, res) => {
  const input = req.body["country"]?.trim();
  if (!input) {
    return renderHome(res, currentUserId, { error: "Please enter a country." });
  }

  try {
    const result = await pool.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return renderHome(res, currentUserId, { error: "Country not found." });
    }

    const countryCode = result.rows[0].country_code;
    try {
      await pool.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2) ON CONFLICT (country_code, user_id) DO NOTHING;",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      return renderHome(res, currentUserId, { error: "Could not add country." });
    }
  } catch (err) {
    console.log(err);
    renderHome(res, currentUserId, { error: "Database error." });
  }
});

app.post("/user", async (req, res) => {
  try {
    if (req.body.user) {
      currentUserId = req.body.user;
      return renderHome(res, currentUserId);
    }
    if (req.body.add) {
      return res.render("new.ejs");
    }
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong!");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  // Add the returned user to the users array
  //https://www.postgresql.org/docs/current/dml-returning.html
  console.log("New user data:", req.body);  
  // Insert the new user into the database
  const { name, color } = req.body;
  if (!name || !color) {
    console.log("Name or color is missing.");
    return res.status(400).send("Name and color are required.");
  }
  try {
    const result = await pool.query(
      "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *;",
      [req.body.name, req.body.color]
    );
    if (result.rows.length === 0) {
      return res.render("new.ejs", { error: "User was not inserted." });
    } 
    
    users.push(result.rows[0]);
    currentUserId = result.rows[0].id; // Update currentUserId to the new user's ID
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.render("new.ejs", { error: "Could not create user." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
