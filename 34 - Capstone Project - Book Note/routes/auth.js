import express from 'express';
import db from '../db/db.js';

const router = express.Router();
// Custom middleware to check if user is logged in
function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

// GET login page
router.get('/login', (req, res) => {
    res.render('login.ejs', { error: null });
});

// POST login handler
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (result.rows.length === 0) {
            return res.send("User not found");
        }

        const user = result.rows[0];
        if (user.password === password) {
            req.session.user = user; // Store user object in session          
            res.redirect('/'); // Redirect to home page after successful login
        } else {
            return res.send("Incorrect Password");
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).send("Login error");
    }
});

// GET logout handler
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).send("Logout error");
        }
        res.redirect('/'); // Redirect to home page after logout
    });
});

export default router;
export { requireLogin };

// module.exports = router;
// module.exports.requireLogin = requireLogin; // Export middleware for use in other routes