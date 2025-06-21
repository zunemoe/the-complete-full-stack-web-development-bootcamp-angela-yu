import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/"

app.use(express.static('public'));

app.get("/", async (req, res) => {
    try {
        // Fetch categories and flags from the API
        const [categories, flags] = await Promise.all([
            axios.get(API_URL + "categories"),
            axios.get(API_URL + "flags")
        ]);
        // console.log("Categories:", categories.data);
        // console.log("Flags:", flags.data);

        // Get user selections for categories, flags and type
        let joke = "";
        const hasUserInput = req.query.categories || req.query.flags || req.query.type;
        if (hasUserInput) {
            const selectedCategories = Array.isArray(req.query.categories) ? req.query.categories.join(',') : req.query.categories || "Any";
            const params = {};
            if (req.query.flags) {
                params.blacklistFlags = Array.isArray(req.query.flags) ? req.query.flags.join(',') : req.query.flags;
            }
            params.type = req.query.type || 'Any';
            // const type = req.query.type || 'Any';
            // const selectedFlags = Array.isArray(req.query.flags) ? req.query.flags.join(',') : req.query.flags;
            
            console.log("Selected Categories:", selectedCategories);

            const queryString = new URLSearchParams(params).toString();
            const fullUrl = `${API_URL}joke/${selectedCategories}${queryString ? "?" + queryString : ""}`;
            console.log("Calling:", fullUrl);

            const url = `${API_URL}joke/${selectedCategories}`;
            const jokeResponse = await axios.get(url, { params });
            const jokeData = jokeResponse.data;
            joke = jokeData.joke || `${jokeData.setup}<br>${jokeData.delivery}` || "No joke found.";
            console.log("Joke fetched:", joke);
        }
        // Fetch jokes based on user selections

        // Render the categories, flags and jokes on the index page
        res.render("index.ejs", {
            categories: categories.data.categories,
            flags: flags.data.flags,
            selected: req.query,
            joke: joke,
        });
    } catch (error) {
        console.error("Error fetching data from API:", error);
        res.render("index.ejs", { joke: error.message });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});