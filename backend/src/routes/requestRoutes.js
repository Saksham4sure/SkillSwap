const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { sendRequest, getIncommingRequests, getOutgoingRequests } = require("../controllers/requestController");

router.post("/", authMiddleware, sendRequest);
router.get("/incoming", authMiddleware, getIncommingRequests);
router.get("/outgoing", authMiddleware, getOutgoingRequests);

module.exports = router;