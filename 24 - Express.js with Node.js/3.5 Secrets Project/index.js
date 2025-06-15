//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let isAuthorized = false;

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    if (req.body.password === "ILoveProgramming") {
        isAuthorized = true;        
    } else {
        isAuthorized = false;
    }
    next();
});

app.post("/check", (req, res) => {
  console.log(req.body);
  if (isAuthorized) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.redirect("/");
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});