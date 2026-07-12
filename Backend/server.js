require('dotenv').config();
const PORT = process.env.PORT;
const app = require("./src/app");
const connectDB = require("./src/db/db");
connectDB();

app.listen(PORT, () => {
        console.log("server is running on port 3000");
});
