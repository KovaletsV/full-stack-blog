import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import postsRouter from "./routes/postsRoute.js";
import commentRoute from "./routes/commentRoute.js";
import fileUpload from "express-fileupload";

dotenv.config();
const app = express();

//Middlewares
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));

//Routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentRoute);

const PORT = process.env.PORT || 5000;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@blog-cluster.waoeusk.mongodb.net/?retryWrites=true&w=majority`
        );
        app.listen(PORT, () => console.log(`server start on ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();
