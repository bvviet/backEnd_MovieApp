import { Router } from "express";
import FavoriteController from "../controller/favorite.js";
const favoriteRouter = Router();

favoriteRouter.get("/accountId/:userId", FavoriteController.getFavoriteAccountId);
favoriteRouter.post("", FavoriteController.addFavorite);
favoriteRouter.delete("/favorites/:userId/:movieId", FavoriteController.deleteFavorite);

export default favoriteRouter;
