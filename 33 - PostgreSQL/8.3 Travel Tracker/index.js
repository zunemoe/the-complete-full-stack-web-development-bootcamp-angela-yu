import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const { Pool } = pg;

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

var visitedCountries = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  visitedCountries = [];
  const result = await pool.query("SELECT country_code FROM visited_countries");
  
  // visitedCountries =result.rows.map((row) => row.country_code);
  result.rows.forEach((country) => {
    visitedCountries.push(country.country_code);
  });
  console.log("Visited countries:", visitedCountries);
  res.render("index.ejs", { 
    total: visitedCountries.length,
    countries: visitedCountries,
  });
});

app.post("/add", (req, res) => {
  // Render the form to add a new country
  const country = req.body.country;
  console.log("Country to add:", country);
  // Query country code from countries table and check if it exists in the visited_countries table
  // If it exists, return an error message saying "Country already exists in the database."
  // If it does not exist, add it to the visited_countries table and update the list of visited countries
  pool.query("SELECT country_code FROM countries WHERE country_name ILIKE $1", [country], (err, result) => {
    console.log("Query result:", result);
    console.log("Query error:", err);
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).send("Internal Server Error");
      return;
    } else if (result.rows.length === 0) {
      res.send("Country not found in the database.");
      return;
    } else {
      const countryCode = result.rows[0].country_code;
      pool.query("SELECT * FROM visited_countries WHERE country_code = $1", [countryCode], (err, result) => {
        console.log("Check if country exists:", result);
        console.log("Check if country exists error:", err);
        if (err) {
          console.error("Error querying database:", err);
          res.status(500).send("Internal Server Error");
          return;
        } else if (result.rows.length > 0) {
          res.send("Country already exists in the database.");
        } else {
          pool.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode], (err, result) => {
            console.log("Insert result:", result);
            console.log("Insert error:", err);
            if (err) {
              console.error("Error inserting into database:", err);
              res.status(500).send("Internal Server Error");
            } else {
              visitedCountries.push(countryCode);
              res.redirect("/");
            }
          });
        }
      });
    }   
  });
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
