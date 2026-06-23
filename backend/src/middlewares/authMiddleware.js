const jwt = require("jsonwebtoken");
require("dotenv").config();


const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.cookie;        

        if (!authHeader) {
            return res.status(401).json({
                message: "Access denied",
            });
        };

        const token = authHeader.split("token=")[1];
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (err) {
        return res.status(401).json({message: "Invalid"});
    };
};

module.exports = authMiddleware;