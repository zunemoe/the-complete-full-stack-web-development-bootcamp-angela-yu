// HINTS:
// 1. Import express and axios
import express from 'express';
import axios from 'axios';

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// 3. Use the public folder for static files.
app.use(express.static('public'));

// 4. When the user goes to the home page it should render the index.ejs file.
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(API_URL + "/random");
        console.log("Random secret fetched:", result.data);
        res.locals.secret = result.data.secret;
        res.locals.username = result.data.username;
        res.render("index.ejs", {
            secret: res.locals.secret,
            username: res.locals.username
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(404).send(error.message);
    }
});
// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});