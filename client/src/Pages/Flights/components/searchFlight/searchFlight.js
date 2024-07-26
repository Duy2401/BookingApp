import Button from "../../../../components/Button/button";
import SearchFlight from "../../../../layout/components/Search/SearchFlight/SearchFlight";
import { ReactComponent as Flight } from "../../../../assets/icons/Flight.svg";
import SvgIcon from "../../../../components/SvgIcon/SvgIcon";
const SearchFlights = () => {
  return (
    <div className="relative">
      <div className="mt-8">
        <SearchFlight />
      </div>
      <div className="px-9 pt-2 mt-30 mx-44 font-Nunito">
        <div className="my-7 shadow-md rounded-md">
          <div className="bg-blue-400 text-white px-4 py-2 rounded-t-md">
            <h2 className="text-xl font-bold">Rẻ nhất</h2>
          </div>
          <div className="space-y-4 mt-4 px-4">
            <div className="flex items-center justify-between border-b pb-4 relative h-32">
              <div className="">
                <div className="flex items-center mb-2 absolute top-0">
                  <SvgIcon icon={Flight} width={20} height={20} />
                  <span className="block text-sm font-medium text-gray-700">
                    Economy
                  </span>
                </div>
                <div className="flex items-center justify-around">
                  <img
                    alt=""
                    src="https://flights-vn.gotogate.com/system/spa/ibeclient/static/media/VN.4d4c24d5.png"
                  />
                  <span className="block text-sm font-bold text-gray-900 ml-3">
                    VietJet Aviation
                  </span>
                </div>
              </div>
              <div className="text-center">
                <span className="block text-xl font-bold">18:00</span>
                <span className="block text-sm text-gray-700">VCA Cần Thơ</span>
                <span className="block text-xs text-gray-500">Cần Thơ</span>
              </div>
              <div className="text-center">
                <span className="block text-sm text-gray-700">2h 5min</span>
                <span className="block text-xl font-bold">→</span>
              </div>
              <div className="text-center">
                <span className="block text-xl font-bold">20:05</span>
                <span className="block text-sm text-gray-700">HAN Hà Nội</span>
                <span className="block text-xs text-gray-500">Hà Nội</span>
              </div>
              <div className="text-center">
                <span className="block text-sm text-gray-700">
                  Hành lý ký gửi không bao gồm
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-b pb-4 relative h-32">
              <div className="">
                <div className="flex items-center mb-2 absolute top-0">
                  <SvgIcon icon={Flight} width={20} height={20} />
                  <span className="block text-sm font-medium text-gray-700">
                    Economy
                  </span>
                </div>
                <div className="flex items-center">
                  <img
                    src="https://flights-vn.gotogate.com/system/spa/ibeclient/static/media/VN.4d4c24d5.png"
                    alt=""
                  />
                  <span className="block text-sm font-bold text-gray-900 ml-3">
                    VietJet Aviation
                  </span>
                </div>
              </div>
              <div className="text-center">
                <span className="block text-xl font-bold">16:25</span>
                <span className="block text-sm text-gray-700">HAN Hà Nội</span>
                <span className="block text-xs text-gray-500">Hà Nội</span>
              </div>
              <div className="text-center">
                <span className="block text-sm text-gray-700">1h 45min</span>
                <span className="block text-xl font-bold">→</span>
              </div>
              <div className="text-center">
                <span className="block text-xl font-bold">18:10</span>
                <span className="block text-sm text-gray-700">VCA Cần Thơ</span>
                <span className="block text-xs text-gray-500">Cần Thơ</span>
              </div>
              <div className="text-center">
                <span className="block text-sm text-gray-700">
                  Hành lý ký gửi không bao gồm
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 px-4 py-2 border-t">
            <div>
              <span className="text-xl font-bold text-gray-900">
                4.369.086 đ
              </span>
              <span className="text-sm text-gray-600">Giá mỗi người lớn</span>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Đặt trước
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchFlights;
