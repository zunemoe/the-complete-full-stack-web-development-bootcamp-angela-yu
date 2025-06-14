import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
