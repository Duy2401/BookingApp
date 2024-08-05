const Reviews = require('../models/review');
const ReviewsController = {
  createReview: async (req, res) => {
    try {
      const {
        booking_service_id,
        booking_service_type,
        customers,
        rating,
        comment,
      } = req.body;

      const newReview = new Reviews({
        booking_service_id,
        booking_service_type,
        customers,
        rating,
        comment,
      });

      await newReview.save();
      res.status(201).json({ status: true, data: newReview });
    } catch (error) {
      res
        .status(500)
        .json({ status: false, message: 'Error creating review', error });
    }
  },

  // Cập nhật một đánh giá hiện tại
  updateReview: async (req, res) => {
    try {
      const reviewId = req.params.id;
      const { rating, comment } = req.body;

      const updatedReview = await Reviews.findByIdAndUpdate(
        reviewId,
        { rating, comment, updatedAt: Date.now() },
        { new: true }
      );

      if (!updatedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }

      res.json(updatedReview);
    } catch (error) {
      res.status(500).json({ message: 'Error updating review', error });
    }
  },

  // Xóa một đánh giá
  deleteReview: async (req, res) => {
    try {
      const reviewId = req.params.id;

      const deletedReview = await Reviews.findByIdAndDelete(reviewId);

      if (!deletedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }

      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting review', error });
    }
  },

  // Lấy tất cả đánh giá
  getAllReviews: async (req, res) => {
    try {
      const reviews = await Reviews.find({
        booking_service_id: req.params.id,
      }).populate('customers');
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reviews', error });
    }
  },
};

module.exports = ReviewsController;
