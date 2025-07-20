const Movie = require('../models/Movie');

// ✅ Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().lean();  
    res.status(200).json(movies); 
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).lean();
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(movie);  
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Add movie
exports.addMovie = (req, res) => {
  const { title, director, year, description, genre } = req.body;

  const newMovie = new Movie({
    title,
    director,
    year,
    description,
    genre,
    comments: []
  });

  newMovie.save()
    .then(savedMovie => res.status(201).json({savedMovie}))
    .catch(err => res.status(500).json({ message: err.message }));
};

// ✅ Update movie
exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, lean: true }
    );
    if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Delete movie
exports.deleteMovie = async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Movie not found' });
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// // ✅ Add comment to movie
// exports.addCommentToMovie = (req, res) => {
//   const { comment } = req.body;
//   const userId = req.user?.id; // From your auth middleware

//   if (!comment) {
//     return res.status(400).json({ message: 'Comment content is required' });
//   }

//   if (!userId) {
//     return res.status(401).json({ message: 'Unauthorized: No user ID found' });
//   }

//   Movie.findById(req.params.id)
//     .then(movie => {
//       if (!movie) return res.status(404).json({ message: 'Movie not found' });

//       movie.comments.push({ userId, content: comment });

//       return movie.save();
//     })
//     .then(updatedMovie => res.status(200).json(updatedMovie))
//     .catch(err => res.status(500).json({ message: 'Server error' }));
// };



// // ✅ Get comments for a specific movie
// exports.getCommentsForMovie = (req, res) => {
//   Movie.findById(req.params.id)
//     .then(movie => {
//       if (!movie) return res.status(404).json({ message: 'Movie not found' });
//       res.status(200).json({ comments: movie.comments || [] });
//     })
//     .catch(err => res.status(500).json({ message: 'Server error' }));
// };
