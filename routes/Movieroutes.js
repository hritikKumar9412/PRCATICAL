const express = require("express");
const router = express.Router();
const movieController = require("../controller/controller");

router.post("/movies", movieController.createMovie);
router.get("/movies", movieController.getMovies);
router.get("/movies/top-rated", movieController.getTopRatedMovies);
router.get("/movies/:id", movieController.getMovieById);
router.put("/movies/:id", movieController.updateMovie);
router.delete("/movies/:id", movieController.deleteMovie);

module.exports = router;