import { useState } from "react";
import Button from "../../../components/Button/button";

const ManagerHotels = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((show) => !show);
  };
  return (
    <div>
      <h1>QUẢN LÝ - THỐNG KÊ KHÁCH SẠN CỦA TÔI</h1>
      <div>
        <div></div>
        <div className="p-4 m-4 text-center">
          <Button
            to={"/partner/addhotels"}
            className="bg-blue-700 text-white p-5 rounded"
            onClick={handleShow}
          >
            TẠO KHÁCH SẠN
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ManagerHotels;
