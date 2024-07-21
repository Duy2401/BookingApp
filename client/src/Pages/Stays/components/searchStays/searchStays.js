import Navigations from "../../../../layout/components/Navigation";
import SearchHotel from "../../../../layout/components/Search/SearchHotel/SearchHotel";
import SideBar from "../../../../layout/components/Sidebar/Sidebar";
import Button from "../../../../components/Button/button";
const SearchStays = () => {
  return (
    <div className="relative">
      <Navigations />
      <div className="mt-8">
        <SearchHotel />
      </div>
      <div className="px-9 pt-2 mt-30 mx-44 font-Nunito">
        <div className="content mt-4 grid grid-cols-grid_col_2A">
          <div className="content mt-4">
            <SideBar />
          </div>
          <div className="list-content--search ml-3 mt-4">
            <div className="flex items-center text-xl font-bold my-4">
              <h1>Vũng tàu:</h1>
              <span className="ml-1"> tìm thấy 1.408 chỗ nghỉ</span>
            </div>
            <div className="search-list">
              <div className="list-item2 my-4 shadow-md cursor-pointer">
                <div className="p-2 grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center border-2 rounded-md">
                  <div className="relative col-span-6 md:col-span-4">
                    <img
                      alt="Album cover"
                      className="object-cover rounded-md"
                      src="https://nextui.org/images/album-cover.png"
                    />
                  </div>
                  <div className="flex flex-col col-span-6 md:col-span-8 h-full">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-0 text-xl font-extrabold text-blue-600 hover:text-black cursor-pointer">
                        The Land Hotel & Apartment
                      </div>
                      <div className="rating flex items-center">
                        <div className="mr-2 text-xs">736 đánh giá</div>
                        <Button className="bg-backgroud p-1 text-white rounded-bl-none rounded-md">
                          9,1
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col mt-3 gap-1">
                      <div className="flex text-blue-800">
                        <p className="text-xs mr-2 underline">Vũng tàu</p>
                        <p className="text-xs underline">Xem trên bản đồ</p>
                      </div>
                    </div>
                    <div className="flex flex-col mt-3 gap-1">
                      <div className="flex justify-between">
                        <Button className="bg-green-700 p-1 text-white rounded-md text-xs">
                          Ưu đãi mùa du lịch
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between flex-row mt-3 gap-1">
                      <div className="border-l-2">
                        <p className="text-sm font-extrabold ml-1">
                          Phòng Deluxe Giường Đôi
                        </p>
                        <p className="text-xs ml-1">1 giường đôi cực lớn</p>
                      </div>
                      <div className="">
                        <div className="text-xs text-textGrey float-right mb-3">
                          3 đêm, 1 người lớn
                        </div>
                        <div className="text-xl font-bold mb-3">
                          VND 1.620.810
                        </div>
                        <div className="text-xs text-textGrey float-right mb-3">
                          Đã bao gồm thuế và phí
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row-reverse mt-3 gap-1">
                      <Button className="bg-btnSearch p-1 text-white rounded-md">
                        Xem chỗ trống
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="list-item2 my-4 shadow-md cursor-pointer">
                <div className="p-2 grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center border-2 rounded-md">
                  <div className="relative col-span-6 md:col-span-4">
                    <img
                      alt="Album cover"
                      className="object-cover rounded-md"
                      src="https://nextui.org/images/album-cover.png"
                    />
                  </div>
                  <div className="flex flex-col col-span-6 md:col-span-8 h-full">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-0 text-xl font-extrabold text-blue-600 hover:text-black cursor-pointer">
                        The Land Hotel & Apartment
                      </div>
                      <div className="rating flex items-center">
                        <div className="mr-2 text-xs">736 đánh giá</div>
                        <Button className="bg-backgroud p-1 text-white rounded-bl-none rounded-md">
                          9,1
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col mt-3 gap-1">
                      <div className="flex text-blue-800">
                        <p className="text-xs mr-2 underline">Vũng tàu</p>
                        <p className="text-xs underline">Xem trên bản đồ</p>
                      </div>
                    </div>
                    <div className="flex flex-col mt-3 gap-1">
                      <div className="flex justify-between">
                        <Button className="bg-green-700 p-1 text-white rounded-md text-xs">
                          Ưu đãi mùa du lịch
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between flex-row mt-3 gap-1">
                      <div className="border-l-2">
                        <p className="text-sm font-extrabold ml-1">
                          Phòng Deluxe Giường Đôi
                        </p>
                        <p className="text-xs ml-1">1 giường đôi cực lớn</p>
                      </div>
                      <div className="">
                        <div className="text-xs text-textGrey float-right mb-3">
                          3 đêm, 1 người lớn
                        </div>
                        <div className="text-xl font-bold mb-3">
                          VND 1.620.810
                        </div>
                        <div className="text-xs text-textGrey float-right mb-3">
                          Đã bao gồm thuế và phí
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row-reverse mt-3 gap-1">
                      <Button className="bg-btnSearch p-1 text-white rounded-md">
                        Xem chỗ trống
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchStays;
