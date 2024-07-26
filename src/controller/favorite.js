import Favorite from "../models/favorite.js";
import StatusCodes from "http-status-codes";
class FavoriteController {
    async addFavorite(req, res) {
        const { userId, movieId, poster_path, title, release_date, vote_average, media_type } = req.body;
        if (!userId) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Bạn chưa đăng nhập.",
            });
        }

        try {
            // Kiểm tra xem danh sách yêu thích của người dùng đã tồn tại chưa
            let favorite = await Favorite.findOne({ userId });
            if (!favorite) {
                favorite = new Favorite({ userId, movies: [] });
            }

            // Kiểm tra xem phim đã tồn tại trong danh sách yêu thích chưa
            const movieExists = favorite.movies.some((movie) => movie.movieId == movieId);
            if (movieExists) {
                return res.status(StatusCodes.CONFLICT).json({
                    message: "Phim này đã có trong danh sách yêu thích.",
                });
            }

            // Thêm phim vào danh sách yêu thích
            favorite.movies.push({
                movieId,
                poster_path,
                title,
                release_date,
                vote_average,
                media_type,
            });

            // Lưu thay đổi vào cơ sở dữ liệu
            await favorite.save();

            res.status(StatusCodes.OK).json({
                message: "Thêm vào danh sách yêu thích thành công",
                favorites: favorite,
            });
        } catch (error) {
            console.error("Error adding to favorites:", error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error adding to favorites" });
        }
    }

    async getFavoriteAccountId(req, res) {
        const { userId } = req.params;
        try {
            const favorite = await Favorite.findOne({ userId });
            if (!favorite) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Không tìm thấy danh sách yêu thích",
                });
            }
            res.status(StatusCodes.OK).json({
                message: "Tìm thấy danh sách yêu thích",
                favorites: favorite,
            });
        } catch (error) {
            console.error("Error getting account ID:", error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error getting account ID");
        }
    }

    async deleteFavorite(req, res) {
        const { userId, movieId } = req.params;

        try {
            // Find the favorite document by userId
            const favorite = await Favorite.findOne({ userId });
            if (!favorite) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Không tìm thấy danh sách yêu thích của người dùng này",
                });
            }

            // Find the index of the movie to be removed
            const movieIndex = favorite.movies.findIndex((movie) => movie.movieId === parseInt(movieId));
            if (movieIndex === -1) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Không tìm thấy bộ phim này trong danh sách yêu thích",
                });
            }

            // Remove the movie from the list
            favorite.movies.splice(movieIndex, 1);

            // Save the updated favorite document
            await favorite.save();

            res.status(StatusCodes.OK).json({
                message: "Xóa thành công.",
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }
}

export default new FavoriteController();
