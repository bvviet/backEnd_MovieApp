import { Router } from "express";
import favoriteRouter from "./favorite.js";
const router = Router();

router.get("/", (req, res) => {
    res.send("Home");
});

router.use("/movies", favoriteRouter);

export default router;
