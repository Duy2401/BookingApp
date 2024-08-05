import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, fetchAllReviews } from '../../../../redux/reviewSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '../../../../components/Button/button';

const Reviews = ({ hotelId }) => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers?.customers);
  const { reviews, status, error } = useSelector((state) => state.review);
  const [listReviews, setListReviews] = useState([]);
  const [reviewData, setReviewData] = useState({
    booking_service_id: hotelId,
    booking_service_type: 'Hotel',
    customers: customers?._id,
    rating: '',
    comment: '',
  });
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const result = await dispatch(
        fetchAllReviews({ hotelID: hotelId, customers })
      );
      setListReviews(result.payload);
    };
    getData();
  }, [dispatch, hotelId, customers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReview({ reviewData, customers }));
    setReviewData({ rating: '', comment: '' });
  };

  const handleComment = () => {
    setShowReview((prev) => !prev);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      <Swiper spaceBetween={20} slidesPerView={3} className="pb-4">
        {listReviews?.length > 0 ? (
          listReviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="border-2 card max-w-sm rounded overflow-hidden shadow-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="rounded-full bg-yellow-400 p-2 w-8 h-8 flex items-center justify-center">
                    <span className="text-black font-extrabold">
                      {review.customers?.customer_name[0]}
                    </span>
                  </div>
                  <div className="ml-2 text-base">
                    {review.customers?.customer_name}
                  </div>
                </div>
                <p className="mt-2 text-sm italic">“{review.comment}”</p>
                <p className="text-sm mt-2">Rating: {review.rating}</p>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="p-4">No reviews yet.</div>
          </SwiperSlide>
        )}
      </Swiper>

      <Button
        className="p-2 text-blue-600 border-2 border-blue-600 rounded mt-3"
        onClick={handleComment}
      >
        Write a Review
      </Button>

      {showReview && (
        <form
          onSubmit={handleSubmit}
          className="my-6 border-2 rounded-lg p-4 bg-white shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-gray-700 font-semibold mb-2"
            >
              Rating:
            </label>
            <input
              id="rating"
              type="number"
              name="rating"
              value={reviewData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              required
              className="w-full border-gray-300 border rounded-lg px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-gray-700 font-semibold mb-2"
            >
              Comment:
            </label>
            <textarea
              id="comment"
              name="comment"
              value={reviewData.comment}
              onChange={handleChange}
              required
              className="w-full border-gray-300 border rounded-lg px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-lg shadow hover:bg-blue-600"
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default Reviews;
