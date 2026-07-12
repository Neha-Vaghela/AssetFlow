import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import connectDB from "./db/db.js";
import categoryRoutes from "./routes/categoryRoutes.js"

import HttpError from "./middleware/HttpError.js";


const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/category", categoryRoutes);


//server
app.get("/", (req, res) => {
    res.json("hello form server");
});

//undefined route handling
app.use((req, res, next) => {
    next(new HttpError("requested route not found", 404));
})

//centralized error handling
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.statusCode || 500).json({ message: error.message || "internal server error" });

})

//port
const port = process.env.PORT || 3000;

//start server
async function startServer() {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`server running on port ${port}`);
        })
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
//call
startServer();
