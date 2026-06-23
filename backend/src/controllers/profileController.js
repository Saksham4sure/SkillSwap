const pool = require("../config/db");

const getProfile = async (req, res) => {
    try {
        const userEmail = req.user.email;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [userEmail]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }        
        return res.status(200).json({ user: user.rows[0] });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error." });
    }
}

module.exports = { getProfile };