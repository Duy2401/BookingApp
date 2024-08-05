const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
  booking_service_id: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'booking_service_type',
  },
  booking_service_type: {
    type: String,
    required: true,
    enum: ['Hotel', 'TourPackage'], // Loại dịch vụ mà đánh giá này thuộc về
  },
  customers: {
    type: Schema.Types.ObjectId,
    ref: 'Customers', // Giả sử bạn sử dụng schema User cho thông tin khách hàng
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Reviews', ReviewsSchema);
