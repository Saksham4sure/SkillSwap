const pool = require("../config/db");

const sendRequest = async (req, res) => {
    try {
        const senderId = req.user.id;
        const { receiverId, senderSkillId, receiverSkillId } = req.body;

        if (senderId === receiverId) {
            return res.status(400).json({ message: "You cannot send a request to yourself." });
        };

        const existing = await pool.query(
            "SELECT * FROM swap_requests WHERE sender_id = $1 AND receiver_id = $2 AND sender_skill_id = $3 AND receiver_skill_id = $4",
            [senderId, receiverId, senderSkillId, receiverSkillId]
        );

        if (existing.rows.length > 0) {
            return res.status(400).json({ message: "Request already sent." });
        };

        const result = await pool.query(
            "INSERT INTO swap_requests (sender_id, receiver_id, sender_skill_id, receiver_skill_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [senderId, receiverId, senderSkillId, receiverSkillId]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error sending request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getIncommingRequests = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const result = await pool.query(
            "SELECT sr.*, u.name AS sender_name FROM swap_requests sr JOIN users u ON sr.sender_id = u.id WHERE sr.receiver_id = $1 ORDER BY sr.created_at DESC",
            [userId]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching incoming requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getOutgoingRequests = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const result = await pool.query(
            "SELECT sr.*, u.name AS receiver_name FROM swap_requests sr JOIN users u ON sr.receiver_id = u.id WHERE sr.sender_id = $1 ORDER BY sr.created_at DESC",
            [userId]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching outgoing requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { sendRequest, getIncommingRequests, getOutgoingRequests };