const pool = require("../config/db");

const getUsers = async (req, res) => {
    try {

        const currentUserId = req.user.id;

        const result = await pool.query(
            `
      SELECT
        u.id,
        u.name,
        u.email,

        COALESCE(
          json_agg(
            json_build_object(
              'id', s.id,
              'name', s.skill_name,
              'type', s.type
            )
          ) FILTER (WHERE s.id IS NOT NULL),
          '[]'
        ) AS skills

      FROM users u

      LEFT JOIN skills s

      ON u.id = s.user_id

      WHERE u.id != $1

      GROUP BY u.id

      ORDER BY u.name
      `,
            [currentUserId]
        );

        res.json(result.rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error",
        });

    }
};

module.exports = { getUsers, };