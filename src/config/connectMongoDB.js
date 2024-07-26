import mongoose from "mongoose";

export default async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.URL_DB || "mongodb://127.0.0.1:27017/movie");
    } catch (error) {
        console.log("Connect failure!!!");
    }
}
