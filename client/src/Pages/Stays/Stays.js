import Navigation from "../../layout/components/Navigation";
import SubtitileBanner from "../../layout/components/SubtitleBanner/index";
import SearchHotel from "../../layout/components/Search/SearchHotel/SearchHotel";
import SaleBanner from "../../assets/images/SaleBanner.jpg";
import Resorts from "../../assets/images/Resorts.jpg";
import Hotels from "../../assets/images/Hotels.jpg";
import "./index.css";
function Stays() {
  return (
    <div>
      <div className="bg-backgroud mb-10 ">
        <Navigation />
        <SubtitileBanner
          className="text-6xl font-black w-3/4"
          titleFirst="Tìm chỗ nghĩ tiếp theo"
          titleThird="Tìm ưu đãi khách sạn, chỗ nghĩ dạng nhà và nhiều hơn nữa ..."
        />
        <SearchHotel />
      </div>
      <div className="px-9 pt-2 mt-30 mx-44 font-Nunito">
        <div className="sale mt-5 mb-40">
          <div>
            <h1 className="text-2xl font-black my-1">Ưu đãi</h1>
            <p className="my-1 font-medium">
              Khuyến mãi, giảm giá và ưu đãi đặc biệt dành riêng cho bạn
            </p>
          </div>
          <div className="w-full h-52 my-3">
            <img
              src={SaleBanner}
              alt="thumbnail"
              className="w-full h-full object-cover rounded"
            />
          </div>
        </div>
        <div className="font-Nunito mt-10">
          <div>
            <h1 className="text-2xl font-black my-1">Tìm theo loại chỗ nghĩ</h1>
          </div>
          <div className="list-card flex justify-between mt-5 gap-4">
            <div className="card">
              <img src={Resorts} alt="thubnail" className="image" />
              <div className="content">
                <span>On your next order over $100</span>
              </div>
            </div>
            <div className="card">
              <img src={Hotels} alt="thubnail" className="image" />
              <div className="content">
                <span>On your next order over $100</span>
              </div>
            </div>
            <div className="card">
              <img src={Resorts} alt="thubnail" className="image" />
              <div className="content">
                <span>On your next order over $100</span>
              </div>
            </div>
            <div className="card">
              <img src={Hotels} alt="thubnail" className="image" />
              <div className="content">
                <span>On your next order over $100</span>
              </div>
            </div>
          </div>
          {/* <div class="overflow-hidden relative w-56 h-64 bg-sky-600 rounded-2xl text-gray-50 flex flex-col justify-end items-center gap-2">
            <svg
              y="0"
              xmlns="http://www.w3.org/2000/svg"
              x="0"
              width="100"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              height="100"
              class="absolute opacity-30 -rotate-12 -bottom-12 -right-12 w-40 h-40 stroke-current"
            >
              <path
                stroke-width="8"
                stroke-linejoin="round"
                stroke-linecap="round"
                fill="none"
                d="M65.8,46.1V30.3a15.8,15.8,0,1,0-31.6,0V46.1M22.4,38.2H77.6l4,47.3H18.4Z"
                class="svg-stroke-primary"
              ></path>
            </svg>
            <div class="flex flex-col items-center">
              <p class="text-xl font-extrabold">Discount</p>
              <p class="relative text-xs inline-block after:absolute after:content-[''] after:ml-2 after:top-1/2 after:bg-gray-200 after:w-12 after:h-0.5   before:absolute before:content-[''] before:-ml-14 before:top-1/2 before:bg-gray-200 before:w-12 before:h-0.5">
                Up to
              </p>
            </div>
            <span class="font-extrabold text-7xl -skew-x-12 -skew-y-12 -mt-1 mb-5">
              70%
            </span>
            <button class="z-10 duration-500 font-bold px-4 py-2 bg-gray-50 text-sky-500 hover:bg-sky-500 hover:text-gray-50">
              Shop now
            </button>
            <p class="text-xs mb-1">*Variable prices</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Stays;
