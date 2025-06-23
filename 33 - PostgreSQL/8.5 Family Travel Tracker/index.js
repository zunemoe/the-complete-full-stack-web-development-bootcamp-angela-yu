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

async function checkVisisted(userid) {
  const result = await pool.query("SELECT country_code FROM visited_countries WHERE user_id = $1", [userid]);
  console.log("Visited countries:", result.rows);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
app.get("/", async (req, res) => {
  await getUsers();
  const countries = await checkVisisted(currentUserId);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "teal",
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await pool.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await pool.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2) ON CONFLICT (country_code, user_id) DO NOTHING;",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  
  if (req.body.user) {
    currentUserId = req.body.user;
    console.log("Current user ID:", currentUserId);
    const countries = await checkVisisted(currentUserId);
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: "teal",
    });
  }

  if (req.body.add) {
    console.log("Add new user:", req.body.add);
    res.render("new.ejs");
  }
  
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  // Add the returned user to the users array
  //https://www.postgresql.org/docs/current/dml-returning.html
  console.log("New user data:", req.body);
  // Insert the new user into the database
  try {
    const result = await pool.query(
      "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *;",
      [req.body.name, req.body.color]
    );
    if (result.rows.length === 0) {
      console.log("No user was inserted.");
      return;
    } else {
      console.log("New user inserted:", result.rows[0]);
      users.push(result.rows[0]);
      currentUserId = result.rows[0].id; // Update currentUserId to the new user's ID
      const countries = await checkVisisted(currentUserId);
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
