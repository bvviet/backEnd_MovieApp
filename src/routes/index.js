import { Router } from "express";
import favoriteRouter from "./favorite.js";
const router = Router();

router.use("/movies", favoriteRouter);

export default router;
