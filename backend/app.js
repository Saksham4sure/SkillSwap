const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("./src/routes/authRoutes");
const profileRoutes = require("./src/routes/profileRoutes");
const skillRoutes = require("./src/routes/skillRoutes");
const userRoutes = require("./src/routes/userRoutes");
const sendRequest = require("./src/routes/requestRoutes");
const authMiddleware = require("./src/middlewares/authMiddleware");


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", sendRequest);

module.exports = app;