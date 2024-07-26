import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./src/routes/index.js";
import connectMongoDB from "./src/config/connectMongoDB.js";

dotenv.config();
const app = express();

const port = 3000;
app.use(cors());
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
