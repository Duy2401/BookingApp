import SearchFlight from "../../layout/components/Search/SearchFlight/SearchFlight";
import SubtitileBanner from "../../layout/components/SubtitleBanner";
import Banner from "../../assets/images/BannerFlights.jpg";
function Flights() {
  return (
    <>
      <div className="bg-backgroud">
        <SubtitileBanner
          className="text-6xl font-extrabold w-3/4"
          titleFirst="Bay với chất lượng, đặt vé cùng niềm tin!"
          titleSecond="Bay đến mọi nơi, chỉ cần một cú click!"
          titleThird="Không gian mới, hành trình mới!"
        />
        <SearchFlight />
      </div>
      <div className="px-9 pt-2 mt-30 mx-44 font-Nunito my-10">
        <div className="w-full h-full relative">
          <img
            src={Banner}
            alt="imageFlights"
            className="w-full h-full rounded-xl object-cove"
          />
          <div className="top-10 absolute left-2 right-2">
            <div className="h-32 rounded text-center p-4 mx-2 font-Nunito">
              <h1 className=" text-white font-bold text-xl text-shadow-md">
                "Hãy sẵn sàng cho cuộc phiêu lưu tiếp theo của bạn"
              </h1>
              <h1 className="text-white italic text-shadow-md">
                "Get ready for your next adventure"
              </h1>
            </div>
          </div>
          <div className="top-2/3 absolute bottom-0 left-0 right-0 bg-bgC_1 blur"></div>
          <div className="my-10 flex justify-around absolute bottom-0 w-full ">
            <div className="mx-3 overflow-hidden relative w-56 h-64 bg-black rounded-2xl text-gray-50 flex flex-col justify-end items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                height="100"
                className="absolute opacity-30 -rotate-12 -bottom-12 -right-12 w-40 h-40 stroke-current"
              >
                <path
                  strokeWidth="8"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                  d="M65.8,46.1V30.3a15.8,15.8,0,1,0-31.6,0V46.1M22.4,38.2H77.6l4,47.3H18.4Z"
                  className="svg-stroke-primary"
                ></path>
              </svg>
              <div className="flex flex-col items-center">
                <p className="text-xl font-extrabold">Discount</p>
                <p className="relative text-xs inline-block after:absolute after:content-[''] after:ml-2 after:top-1/2 after:bg-gray-200 after:w-12 after:h-0.5   before:absolute before:content-[''] before:-ml-14 before:top-1/2 before:bg-gray-200 before:w-12 before:h-0.5">
                  Up to
                </p>
              </div>
              <span className="font-extrabold text-7xl -skew-x-12 -skew-y-12 -mt-1 mb-5">
                50%
              </span>
              <button className="z-10 duration-500 font-bold px-4 py-2 bg-gray-50 text-sky-500 hover:bg-sky-500 hover:text-gray-50">
                Shop now
              </button>
              <p className="text-xs mb-1">*Variable prices</p>
            </div>
            <div className="mx-3 overflow-hidden relative w-56 h-64 bg-black rounded-2xl text-gray-50 flex flex-col justify-end items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                height="100"
                className="absolute opacity-30 -rotate-12 -bottom-12 -right-12 w-40 h-40 stroke-current"
              >
                <path
                  strokeWidth="8"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                  d="M65.8,46.1V30.3a15.8,15.8,0,1,0-31.6,0V46.1M22.4,38.2H77.6l4,47.3H18.4Z"
                  className="svg-stroke-primary"
                ></path>
              </svg>
              <div className="flex flex-col items-center">
                <p className="text-xl font-extrabold">Discount</p>
                <p className="relative text-xs inline-block after:absolute after:content-[''] after:ml-2 after:top-1/2 after:bg-gray-200 after:w-12 after:h-0.5   before:absolute before:content-[''] before:-ml-14 before:top-1/2 before:bg-gray-200 before:w-12 before:h-0.5">
                  Up to
                </p>
              </div>
              <span className="font-extrabold text-7xl -skew-x-12 -skew-y-12 -mt-1 mb-5">
                25%
              </span>
              <button className="z-10 duration-500 font-bold px-4 py-2 bg-gray-50 text-sky-500 hover:bg-sky-500 hover:text-gray-50">
                Shop now
              </button>
              <p className="text-xs mb-1">*Variable prices</p>
            </div>
            <div className="mx-3 overflow-hidden relative w-56 h-64 bg-black rounded-2xl text-gray-50 flex flex-col justify-end items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                height="100"
                className="absolute opacity-30 -rotate-12 -bottom-12 -right-12 w-40 h-40 stroke-current"
              >
                <path
                  strokeWidth="8"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  fill="none"
                  d="M65.8,46.1V30.3a15.8,15.8,0,1,0-31.6,0V46.1M22.4,38.2H77.6l4,47.3H18.4Z"
                  className="svg-stroke-primary"
                ></path>
              </svg>
              <div className="flex flex-col items-center">
                <p className="text-xl font-extrabold">Discount</p>
                <p className="relative text-xs inline-block after:absolute after:content-[''] after:ml-2 after:top-1/2 after:bg-gray-200 after:w-12 after:h-0.5   before:absolute before:content-[''] before:-ml-14 before:top-1/2 before:bg-gray-200 before:w-12 before:h-0.5">
                  Up to
                </p>
              </div>
              <span className="font-extrabold text-7xl -skew-x-12 -skew-y-12 -mt-1 mb-5">
                10%
              </span>
              <button className="z-10 duration-500 font-bold px-4 py-2 bg-gray-50 text-sky-500 hover:bg-sky-500 hover:text-gray-50">
                Shop now
              </button>
              <p className="text-xs mb-1">*Variable prices</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Flights;
