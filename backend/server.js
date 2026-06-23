const app = require("./app");
const pool = require("./src/config/db");
require("dotenv").config();
const PORT = process.env.PORT;

pool.connect().then(() => {
    console.log("Connection to database established");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("Failed to connect database",err); 
});