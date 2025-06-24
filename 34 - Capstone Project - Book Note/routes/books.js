import express from 'express';
import db from '../db/db.js';
import { requireLogin } from './auth.js';
import axios from 'axios';

const router = express.Router();

// API endpoints
// https://covers.openlibrary.org/b/isbn/book-isbn.json
const API_URL = "https://covers.openlibrary.org/b/isbn/";

// Public routes (no login required)
// GET home page with list of books
router.get("/", async (req, res) => {
    try {
        // Fetch all books from the database
        // -> Todo: ORDER BY should be dynamic based on user preference`
        const allowedSorts = ['date_read', 'title', 'author', 'rating'];
        const sortBy = allowedSorts.includes(req.query.sort) ? req.query.sort : 'date_read'; // Default to date_read if invalid sort
        const result = await db.query(`SELECT * FROM books ORDER BY ${sortBy} DESC`);        
        res.render("index", {
            books: result.rows, 
            userID: req.session.userID,
            search: req.query.search || '', // Pass search query to the view
            sort: sortBy // Pass sort option to the view
        } );
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).send("Error fetching books");
    }
});

// Search for books by title or author
router.get("/search", async (req, res) => {
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
    const coverUrl = await fetchBookCover(isbn); // Fetch book cover image using ISBN
    const userId = req.session.userId; // Get user ID from session
    try {
        const result = await db.query(
            "UPDATE books SET title = $1, author = $2, rating = $3, review = $4, date_read = $5, isbn = $6, cover_url = $7 WHERE id = $8 AND user_id = $9 RETURNING *",
            [title, author, rating, review, date_read, isbn, coverUrl, req.params.id, userId]
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
        const result = await db.query(
            "DELETE FROM books WHERE id = $1 AND user_id = $2 RETURNING *",
            [req.params.id, req.session.userId]
        );
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
    const coverUrl = await fetchBookCover(isbn); // Fetch book cover image using ISBN
    const userId = req.session.user.userId; // Get user ID from session
    try {
        await db.query(
            "INSERT INTO books (title, author, rating, review, date_read, isbn, cover_url, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [title, author, rating, review, date_read, isbn, coverUrl, userId]
        );
        res.redirect('/');
    } catch (err) {
        console.error("Error adding book:", err);
        res.status(500).send("Error adding book");
    }
});

// Functions
// Function to fetch book cover image from Open Library API
async function fetchBookCover(isbn) {
    if (!isbn) return null; // Return null if no ISBN is provided

    try {
        const url = `${API_URL}${isbn}-L.jpg?default=false`; // Use the Open Library API URL format
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        if (response.status === 200) {
            console.log("Book cover fetched successfully:", url);            
            return url;
        } else {
            console.error("Failed to fetch book cover, status code:", response.status);
            return null; // Return null if the request fails
        }
    } catch (err) {
        console.error("Error fetching book cover:", err);
        return null; // Return null if there's an error
    }
}

// Function to fetch book details from db
async function getBookDetails(id) {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    return result.rows[0];
}

export default router;
