import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import booksRouter from './routes/books.js';
import authRouter from './routes/auth.js';

const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: 'booknote_secret_0123450',
    resave: false,
    saveUninitialized: false
}));

// View engine setup
app.set("view engine", "ejs");

// Routes setup
app.use((req, res, next) => {
    // Make user ID available in all views
    res.locals.user = req.session.user || null;
    next();
});
app.use('/', booksRouter);
app.use('/', authRouter);

// Home route
app.get("/", (req, res) => {
    res.redirect('/books');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

