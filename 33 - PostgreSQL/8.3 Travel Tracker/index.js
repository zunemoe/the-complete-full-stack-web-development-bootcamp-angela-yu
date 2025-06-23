import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const { Pool } = pg;

var visitedCountries = [];
const app = express();
const port = 3000;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "divine",
  port: 5432,
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT country_code FROM visited_countries");
    visitedCountries = result.rows.map((row) => row.country_code);
    console.log("Visited countries:", visitedCountries);
    res.render("index.ejs", { 
      total: visitedCountries.length,
      countries: visitedCountries,
    });
  } catch (error) {
    console.error("Error fetching visited countries:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/add", async (req, res) => {
  const country = req.body.country;
  console.log("Country to add:", country);

  try {
    const result = await pool.query("SELECT country_code FROM countries WHERE country_name ILIKE '%' || $1 || '%'", [country]);
    console.log("Query result:", result.rows);
    if (result.rows.length === 0) {
      // res.send("Country not found in the database.");
      res.render("index.ejs", {
        error: "Country not found in the database.",
        total: visitedCountries.length,
        countries: visitedCountries,
      })
      return;
    }

    const countryCode = result.rows[0].country_code;
    const checkResult = await pool.query("SELECT * FROM visited_countries WHERE country_code = $1", [countryCode]);

    if (checkResult.rows.length > 0) {
      // res.send("Country already exists in the database.");
      res.render("index.ejs", {
        error: "Country already exists in the database.",
        total: visitedCountries.length,
        countries: visitedCountries,
      })
      return;
    }

    await pool.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode]);
    res.redirect("/");
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
