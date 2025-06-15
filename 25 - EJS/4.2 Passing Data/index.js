import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
  console.log(req.body);
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  let length = req.body.fName.length + req.body.lName.length;
  res.render("index.ejs", {
    length: length,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
