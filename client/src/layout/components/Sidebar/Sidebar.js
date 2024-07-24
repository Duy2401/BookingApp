import { ReactComponent as SwitchIcon } from "../../../assets/icons/Switch.svg";
import { ReactComponent as InputIcon } from "../../../assets/icons/InputIcon.svg";
import SvgIcon from "../../../components/SvgIcon/SvgIcon";
import { useState } from "react";
const SideBar = () => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
    }).format(value);
  };
  const [moneyRank, setMoneyRank] = useState(100);
  return (
    <>
      <div className="map-container">
        <h4 className="text-sm font-light mb-4 text-blue-700">
          Kết quả tìm kiếm
        </h4>
        <div className="map relative">
          <div className="w-full h-40 ">
            <iframe
              className="w-full h-full rounded"
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1721538591064!5m2!1svi!2s"
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <button className="show-map text-white bg-btnSearch text-sm font-bold rounded p-2 absolute top-1/2 translate-x-1/3">
            Hiển thị trên bản đồ
          </button>
        </div>
      </div>
      <div className="filter-container mt-3 font-Nunito border-bder_1 rounded">
        <h2 className="text-base font-bold border-b-2 p-3">Chọn lọc theo: </h2>
        <div className="filter-item border-bder_1 p-2">
          <h1 className="text-base font-bold mb-2">Dùng bộ lọc tổng quát:</h1>
          <div className="flex">
            <SvgIcon icon={SwitchIcon} width={24} height={24} />
            <label htmlFor="all" className="flex-2 ml-1">
              Áp dụng cho tất cả
            </label>
          </div>
          <div className="flex items-center mt-3 w-full">
            <SvgIcon icon={InputIcon} width={24} height={24} />
            <div className="flex w-full text-sm items-center">
              <label htmlFor="budget" className="flex-auto ml-1">
                Khách sạn
              </label>
              <span>65</span>
            </div>
          </div>
          <div className="flex items-center mt-3 w-full">
            <SvgIcon icon={InputIcon} width={24} height={24} />
            <div className="flex w-full text-sm items-center">
              <label htmlFor="budget" className="flex-auto ml-1">
                Biệt thự
              </label>
              <span>65</span>
            </div>
          </div>
          <div className="flex items-center mt-3 w-full">
            <SvgIcon icon={InputIcon} width={24} height={24} />
            <div className="flex w-full text-sm items-center">
              <label htmlFor="budget" className="flex-auto ml-1">
                Căn hộ
              </label>
              <span>65</span>
            </div>
          </div>
          <div className="flex items-center mt-3 w-full">
            <SvgIcon icon={InputIcon} width={24} height={24} />
            <div className="flex w-full text-sm items-center">
              <label htmlFor="budget" className="flex-auto ml-1">
                Resorts
              </label>
              <span>65</span>
            </div>
          </div>
          <div className="flex items-center mt-3 w-full">
            <SvgIcon icon={InputIcon} width={24} height={24} />
            <div className="flex w-full text-sm items-center">
              <label htmlFor="budget" className="flex-auto ml-1">
                Khu nghĩ dưỡng
              </label>
              <span>65</span>
            </div>
          </div>
        </div>
        <div className="filter-item border-bder_1 p-2">
          <h1 className="text-base font-bold mb-2">Chi phí mong muốn</h1>
          <div className="flex items-center mt-3 w-full">
            <div className="w-full text-sm items-center">
              <div htmlFor="budget" className="flex-auto ml-1">
                VND 100.000 - VND {formatCurrency(moneyRank)}
              </div>
              <input
                type="range"
                className="w-full"
                min={100}
                max={2000000}
                value={moneyRank}
                onChange={(e) => setMoneyRank(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="filter-item border-bder_1 p-2">
          <h1 className="text-base font-bold mb-2">Loại chỗ ở</h1>
          <div className="flex items-center mt-3 w-full">
            <SvgIcon icon={InputIcon} width={24} height={24} />
            <div className="flex w-full text-sm items-center">
              <label htmlFor="budget" className="flex-auto ml-1">
                Khách sạn
              </label>
              <span>65</span>
            </div>
          </div>
          <div className="flex items-center mt-3 w-full">
            <SvgIcon icon={InputIcon} width={24} height={24} />
            <div className="flex w-full text-sm items-center">
              <label htmlFor="budget" className="flex-auto ml-1">
                Biệt thự
              </label>
              <span>65</span>
            </div>
          </div>
          <div className="flex items-center mt-3 w-full">
            <SvgIcon icon={InputIcon} width={24} height={24} />
            <div className="flex w-full text-sm items-center">
              <label htmlFor="budget" className="flex-auto ml-1">
                Căn hộ
              </label>
              <span>65</span>
            </div>
          </div>
          <div className="flex items-center mt-3 w-full">
            <SvgIcon icon={InputIcon} width={24} height={24} />
            <div className="flex w-full text-sm items-center">
              <label htmlFor="budget" className="flex-auto ml-1">
                Resorts
              </label>
              <span>65</span>
            </div>
          </div>
          <div className="flex items-center mt-3 w-full">
            <SvgIcon icon={InputIcon} width={24} height={24} />
            <div className="flex w-full text-sm items-center">
              <label htmlFor="budget" className="flex-auto ml-1">
                Khu nghĩ dưỡng
              </label>
              <span>65</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SideBar;
