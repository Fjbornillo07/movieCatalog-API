const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const commentController = require('../controllers/commentController');

const { authenticate, authorizeAdmin } = require('../auth');

// READ
router.get('/getMovies', authenticate, movieController.getAllMovies);
router.get('/getMovie/:id', authenticate, movieController.getMovieById);

// CREATE (Admin only)
router.post('/addMovie', authenticate, authorizeAdmin, movieController.addMovie);

// UPDATE (Admin only)
router.patch('/updateMovie/:id', authenticate, authorizeAdmin, movieController.updateMovie);

// DELETE (Admin only)
router.delete('/deleteMovie/:id', authenticate, authorizeAdmin, movieController.deleteMovie);

// add comment
router.patch('/addComment/:id', authenticate, commentController.addCommentToMovie);
router.get('/getComments/:id', authenticate, commentController.getCommentsForMovie);

module.exports = router;


// {
//     "endpoints": {
//         "login":"/login",
//         "register":"/register",
//         "addMovie": "/addMovie",
//         "getAllMovies":"/getMovies",
//         "getMovieById":"/getMovie",
//         "updateMovie":"/updateMovie",
//         "deleteMovie":"/deleteMovie",
//         "addMovieComment":"/addComment",
//         "getMovieComments":"/getComments"
//     }
// }