const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all credentials." });
    };

    console.log(req.body);

    const checkUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkUser.rows.length > 0) {
        return res.status(400).json({ message: "User with that email already exists" });
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await pool.query(
        "INSERT INTO users (name,email,password) VALUES ($1, $2, $3) RETURNING id, name, email",
        [name, email, hashedPassword]
    );

    const token = jwt.sign({id:createUser.rows[0].id, email: email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token);
    return res.status(201).json({ user: checkUser.rows[0], message: "User registered successfully." });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide all credentials." });
    };    

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
        return res.status(400).json({ message: "User is not registerd." })
    };

    const userData = user.rows[0];
    const verified = await bcrypt.compare(password, userData.password);
    if (!verified) {
        return res.status(400).json({ message: "Invalid credentials." })
    }

    const token = jwt.sign({id:userData.id, email: email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token);
    
    return res.status(201).json({ user: user.rows[0] });
};

const logout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: "Logged out successfully." });
};

module.exports = { registerUser, login, logout };