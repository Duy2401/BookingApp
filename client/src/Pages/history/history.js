import Button from '../../components/Button/button';
import { Outlet } from 'react-router-dom';
const History = () => {
  return (
    <div className="min-h-screen px-9 pt-2 mt-30 mx-44 font-Nunito">
      <div className="ml-2 mt-5">
        <div className="bg-white p-4 rounded-lg shadow-lg border-2 ">
          <h2 className="text-2xl font-bold text-center">
            THÔNG TIN TÀI KHOẢN - ĐẶT CHỖ VÀ CHUYẾN ĐI
          </h2>
        </div>
        <ul className="my-5">
          <li className="bg-white rounded-lg shadow-lg border-2 my-3 flex justify-around">
            <Button
              to="/history/hotelhistory"
              className="py-3 hover:opacity-30 flex-1 text-lg font-bold text-center"
            >
              Khách Sạn
            </Button>
            <Button
              to="/history/tourhistory"
              className="py-3 hover:opacity-30 flex-1 text-lg font-bold text-center"
            >
              Tours
            </Button>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default History;
