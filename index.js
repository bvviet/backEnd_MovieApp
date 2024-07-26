import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./src/routes/index.js";
import connectMongoDB from "./src/config/connectMongoDB.js";

dotenv.config();
const app = express();

const port = 3000;

// Cấu hình lại cors
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.use("/", router);

connectMongoDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
