const Movie = require("../models/Movies");


exports.createMovie = async (req, res) => {
  try {
    const { title, director, rating } = req.body;

    if (!title || !director || rating === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const movie = await Movie.create({ title, director, rating });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateMovie = async (req, res) => {
  try {
    const { title, director, rating } = req.body;

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, director, rating },
      { new: true, runValidators: true }
    );

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTopRatedMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ rating: { $gt: 8 } });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};