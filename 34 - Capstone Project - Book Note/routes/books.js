import express from 'express';
import db from '../db/db.js';
import { requireLogin } from './auth.js';
import axios from 'axios';

const router = express.Router();
const allowedSorts = ['date_read', 'title', 'author', 'rating'];
// API endpoints
// https://covers.openlibrary.org/b/isbn/book-isbn.json
const API_URL = "https://covers.openlibrary.org/b/isbn/";

// Public routes (no login required)
// GET home page with list of books
router.get("/", async (req, res) => {
    try {
        // Fetch all books from the database
        // -> Todo: ORDER BY should be dynamic based on user preference`        
        const sortBy = allowedSorts.includes(req.query.sort) ? req.query.sort : 'date_read'; // Default to date_read if invalid sort
        const order = req.query.order === 'ASC' ? 'ASC' : 'DESC'; // Default to DESC if order is not specified
        const result = await db.query(`SELECT * FROM books ORDER BY ${sortBy} ${order}`);        
        res.render("index", {
            books: result.rows, 
            userID: req.session.id,
            search: req.query.search || '', // Pass search query to the view
            sort: sortBy, // Pass sort option to the view
            order
        } );
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).send("Error fetching books");
    }
});

// Search for books by title or author
router.get("/search", async (req, res) => {
    try {
        const query = req.query.search || '';
        const sortBy = allowedSorts.includes(req.query.sort) ? req.query.sort : 'date_read'; // Default to date_read if invalid sort
        const order = req.query.order === 'ASC' ? 'ASC' : 'DESC'; // Default to DESC if order is not specified
        const result = await db.query(`SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $1 OR isbn ILIKE $1 ORDER BY ${sortBy} ${order}`, [`%${query}%`]);
        res.render("index", {
            books: result.rows,
            user: req.session.user,
            search: query, // Pass search query to the view
            sort: sortBy, // Pass sort option to the view
            order
        });
    } catch (err) {
        console.error("Error searching books:", err);
        res.status(500).send("Error searching books");
    }
});

// View book details by ID
router.get("/book/:id", async (req, res) => {
    // Use the getBookDetails function to fetch book details
    try {
        const bookDetails = await getBookDetails(req.params.id);
        if (!bookDetails) {
            return res.status(404).send("Book not found");
        }
        res.render("book", { book: bookDetails });
    } catch (err) {
        console.error("Error fetching book details:", err);
        res.status(500).send("Error fetching book details");
    }
});

// Restricted routes (require login)
// Show form to edit book details by ID
router.get("/edit/:id", requireLogin, async (req, res) => {
    // Use the getBookDetails function to fetch book details
    try {
        const bookDetails = await getBookDetails(req.params.id);
        if (!bookDetails) {
            return res.status(404).send("Book not found");
        }
        res.render("edit", { book: bookDetails });
    } catch (err) {
        console.error("Error fetching book details for edit:", err);
        res.status(500).send("Error fetching book details for edit");
    }
});

// Edit book details by ID
router.post("/edit/:id", requireLogin, async (req, res) => {
    const { title, author, rating, review, date_read, isbn } = req.body;
    const current = await getBookDetails(req.params.id); // Fetch current book details
    const { url: coverUrl, fetched: coverLastFetched } = await fetchBookCover(isbn, current.cover_url, current.cover_last_fetched); // Fetch book cover image using ISBN
    const userId = req.session.user.id; // Get user ID from session
    try {
        const result = await db.query(
            "UPDATE books SET title = $1, author = $2, rating = $3, review = $4, date_read = $5, isbn = $6, cover_url = $7, cover_last_fetched = $8 WHERE id = $9 AND user_id = $10 RETURNING *",
            [title, author, rating, review, date_read, isbn, coverUrl, coverLastFetched, req.params.id, userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).send("Book not found or you do not have permission to edit this book");
        }
        res.redirect('/');
    } catch (err) {
        console.error("Error updating book:", err); 
        res.status(500).send("Error updating book");
    }
});

// Delete book by ID
router.post("/delete/:id", requireLogin, async (req, res) => {
    try {
        console.log("session: ", req.session);
        const result = await db.query(
            "DELETE FROM books WHERE id = $1 AND user_id = $2 RETURNING *",
            [req.params.id, req.session.user.id] // Use userId from session
        );
        // console.log("Delete result:", result);
        if (result.rows.length === 0) {
            return res.status(404).send("Book not found or you do not have permission to delete this book");
        }
        res.redirect('/');
    } catch (err) {
        console.error("Error deleting book:", err);
        res.status(500).send("Error deleting book");
    }
});

// Show form to add a new book
router.get("/add", requireLogin, (req, res) => {
    console.log("user:", req.session.user);
    res.render("add", { user: req.session.user });
});

// Add a new book to the database
router.post("/add", requireLogin, async (req, res) => {
    const { title, author, rating, review, date_read, isbn} = req.body;
    const { url: coverUrl, fetched: coverLastFetched } = await fetchBookCover(isbn, null, null); // Fetch cover URL and last fetched time
    const userId = req.session.user.id; // Get user ID from session
    try {
        await db.query(
            "INSERT INTO books (title, author, rating, review, date_read, isbn, cover_url, cover_last_fetched, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [title, author, rating, review, date_read, isbn, coverUrl, coverLastFetched, userId]
        );
        res.redirect('/');
    } catch (err) {
        console.error("Error adding book:", err);
        res.status(500).send("Error adding book");
    }
});

// Functions
// Function to fetch book details from db
async function getBookDetails(id) {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    return result.rows[0];
}

// Function to fetch book cover image from Open Library API
async function fetchBookCover(isbn, currentCoverURL, lastFetched) {
    if (!isbn) return { url: null, fetched: null }; // Return null if no ISBN is provided

    // If fetched within the last 24 hours, return cached URL
    const _24_HOURS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const now = new Date();
    const fetchedAt = lastFetched ? new Date(lastFetched) : null;

    if (currentCoverURL && fetchedAt && now - fetchedAt < _24_HOURS) {
        return { url: currentCoverURL, fetched: fetchedAt };
    }        
    
    const url = `${API_URL}${isbn}-L.jpg?default=false`; // Use the Open Library API URL format
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        if (response.status === 200) {
            return { url: url, fetched: now }; // Return the new URL and current time
        } else {
            return { url: null, fetched: null }; // Return null if the request fails
        }
    } catch (err) {
        console.error("Error fetching book cover:", err);
        return { url: null, fetched: null }; // Return null if there's an error
    }
}

export default router;
