import express from "express";
const app = express();
const port = 3000;

const today = new Date();
const day = today.getDay();

let dayType = "a weekday";
let message = "work hard!";

if (day === 0 || day === 6) {
    dayType = "a weekend";
    message = "have fun!";
}

app.get("/", (req, res) => {
    res.render("index.ejs", {
        dayType: dayType,
        message: message,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
