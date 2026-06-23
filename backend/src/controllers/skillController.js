const pool = require("../config/db");

const addSkill = async (req, res) => {
    console.log(req.user)
    try{
        const userID = req.user.id;
        const { name, description, type } = req.body;
        
        const result = await pool.query(
            "INSERT INTO skills (user_id, skill_name, description, type) VALUES ($1, $2, $3, $4) RETURNING *",
            [userID, name, description, type]
        );
        res.status(201).json(result.rows[0] );
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    };
};

const getSkills = async (req, res) => {
    try{
        const userID = req.user.id;        
        const result = await pool.query(
            "SELECT * FROM skills WHERE user_id = $1",
            [userID]
        );
        res.status(200).json( result.rows );
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    };
};

const updateSkill = async (req, res) => {
    try{
        const userID = req.user.id;
        const skillID = req.params.id;
        const { name, description, type } = req.body;
        
        const result = await pool.query(
            "UPDATE skills SET skill_name = $1, description = $2, type = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
            [name, description, type, skillID, userID]
        );
        if(result.rows.length === 0) {
            return res.status(404).json({ error: "Skill not found" });
        }
        res.status(200).json( result.rows[0] );
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    };
};

const deleteSkill = async (req, res) => {
    try{
        const userID = req.user.id;
        const skillID = req.params.id;
        
        const result = await pool.query(
            "DELETE FROM skills WHERE id = $1 AND user_id = $2 RETURNING *",
            [skillID, userID]
        );
        if(result.rows.length === 0) {
            return res.status(404).json({ error: "Skill not found" });
        }
        res.status(200).json({ message: "Skill deleted successfully" });
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    };
};

module.exports = { addSkill, getSkills, updateSkill, deleteSkill };