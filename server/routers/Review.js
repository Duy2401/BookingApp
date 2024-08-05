const ReviewsController = require('../controllers/reviewsController');
const router = require('express').Router();

// Creater
router.post('/addreview', ReviewsController.createReview);
// GetforHotel
router.get('/getreviews/:id', ReviewsController.getAllReviews);

module.exports = router;
