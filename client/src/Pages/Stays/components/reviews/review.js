import { useState } from "react";
import Button from "../../../../components/Button/button";
import { Swiper, SwiperSlide } from "swiper/react";
const Review = () => {
  const [showReview, setShowReview] = useState(false);
  const handleComment = () => {
    setShowReview((showReview) => !showReview);
  };
  return (
    <div>
      <h2 class="text-2xl font-bold mb-4">Đánh giá của khách</h2>
      <Swiper spaceBetween={20} slidesPerView={4} className="pb-4">
        <SwiperSlide>
          <div className="border-2 mb-2.5 card max-w-60 max-h-40 rounded overflow-hidden justify-center flex flex-col items-center hover:cursor-pointer">
            <div className="content p-4 w-full">
              <div className="infor flex items-center">
                <div className="rounded-full mr-2 bg-yellow-400 p-p_5_10 w-8">
                  <span className="text-black font-extrabold">D</span>
                </div>
                <div className="infor-name text-base">New Customers</div>
              </div>
              <p className="mt-2 text-sm italic">
                “Lễ tân thân thiện niềm nở, phòng sạch tiện nghi, thiết bị vật
                dụng đều sử dụng tốt”
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-2 mb-2.5 card max-w-60 max-h-40 rounded overflow-hidden justify-center flex flex-col items-center hover:cursor-pointer">
            <div className="content p-4 w-full">
              <div className="infor flex items-center">
                <div className="rounded-full mr-2 bg-yellow-400 p-p_5_10 w-8">
                  <span className="text-black font-extrabold">D</span>
                </div>
                <div className="infor-name text-base">New Customers</div>
              </div>
              <p className="mt-2 text-sm italic">
                “Lễ tân thân thiện niềm nở, phòng sạch tiện nghi, thiết bị vật
                dụng đều sử dụng tốt”
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-2 mb-2.5 card max-w-60 max-h-40 rounded overflow-hidden justify-center flex flex-col items-center hover:cursor-pointer">
            <div className="content p-4 w-full">
              <div className="infor flex items-center">
                <div className="rounded-full mr-2 bg-yellow-400 p-p_5_10 w-8">
                  <span className="text-black font-extrabold">D</span>
                </div>
                <div className="infor-name text-base">New Customers</div>
              </div>
              <p className="mt-2 text-sm italic">
                “Lễ tân thân thiện niềm nở, phòng sạch tiện nghi, thiết bị vật
                dụng đều sử dụng tốt”
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-2 mb-2.5 card max-w-60 max-h-40 rounded overflow-hidden justify-center flex flex-col items-center hover:cursor-pointer">
            <div className="content p-4 w-full">
              <div className="infor flex items-center">
                <div className="rounded-full mr-2 bg-yellow-400 p-p_5_10 w-8">
                  <span className="text-black font-extrabold">D</span>
                </div>
                <div className="infor-name text-base">New Customers</div>
              </div>
              <p className="mt-2 text-sm italic">
                “Lễ tân thân thiện niềm nở, phòng sạch tiện nghi, thiết bị vật
                dụng đều sử dụng tốt”
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border-2 mb-2.5 card max-w-60 max-h-40 rounded overflow-hidden justify-center flex flex-col items-center hover:cursor-pointer">
            <div className="content p-4 w-full">
              <div className="infor flex items-center">
                <div className="rounded-full mr-2 bg-yellow-400 p-p_5_10 w-8">
                  <span className="text-black font-extrabold">D</span>
                </div>
                <div className="infor-name text-base">New Customers</div>
              </div>
              <p className="mt-2 text-sm italic">
                “Lễ tân thân thiện niềm nở, phòng sạch tiện nghi, thiết bị vật
                dụng đều sử dụng tốt”
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <Button
        className="p-2 text-blue-600 border-2 border-blue-600 rounded"
        onClick={handleComment}
      >
        Viết đánh giá
      </Button>
      {showReview && (
        <form className="my-6 border-2 rounded-lg">
          <label for="chat" class="sr-only">
            Your message
          </label>
          <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <button
              type="button"
              class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 18"
              >
                <path
                  fill="currentColor"
                  d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                />
              </svg>
              <span class="sr-only">Upload image</span>
            </button>
            <button
              type="button"
              class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                />
              </svg>
              <span class="sr-only">Add emoji</span>
            </button>
            <textarea
              id="chat"
              rows="1"
              class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
            ></textarea>
            <button
              type="submit"
              class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                class="w-5 h-5 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
              <span class="sr-only">Send message</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default Review;
