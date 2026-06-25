const express = require("express");
const router = express.Router();
const { registerUser, login, logout, authCheck } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", authMiddleware, authCheck);

module.exports = router;