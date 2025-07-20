const Comment = require('../models/Comment');
const Movie = require('../models/Movie');

 

// ✅ Add comment to a movie
exports.addCommentToMovie = async (req, res) => {
  const { comment } = req.body;
  const userId = req.user?.id;

  if (!comment || !userId) {
    return res.status(400).json({ message: 'Missing comment or user ID' });
  }

  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const newComment = new Comment({
      movieId: req.params.id,
      userId,
      comment
    });

    const saved = await newComment.save();

    res.status(201).json({
      _id: saved._id,
      userId: saved.userId,
      comment: saved.comment
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


// ✅ Get comments for a movie
exports.getCommentsForMovie = async (req, res) => {
  try {
    const comments = await Comment.find({ movieId: req.params.id })
      .sort({ createdAt: -1 })
      .select('_id userId comment');

    res.status(200).json({ comments });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
