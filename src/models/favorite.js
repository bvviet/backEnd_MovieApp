import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    movies: [
        {
            movieId: Number,
            poster_path: String,
            title: String,
            release_date: String,
            vote_average: Number,
            media_type: String,
        },
    ],
});

const Favorite = mongoose.model("Favorite", favoriteSchema);
export default Favorite;
