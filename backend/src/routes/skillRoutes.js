const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const { addSkill, getSkills, updateSkill, deleteSkill, } = require("../controllers/skillController");

router.post("/", authMiddleware, addSkill);
router.get("/", authMiddleware, getSkills);
router.put("/:id", authMiddleware, updateSkill);
router.delete("/:id", authMiddleware, deleteSkill);

module.exports = router;