import { useState } from "react";
import { Outlet } from "react-router-dom";
import Button from "../../components/Button/button";
function Partner() {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((show) => !show);
  };
  return (
    <>
      <div className="p-4 h-80">
        <div className="p-4 m-4 text-center">
          <Button
            to={"/partner/addhotels"}
            className="bg-blue-700 text-white p-5"
            onClick={handleShow}
          >
            TẠO KHÁCH SẠN
          </Button>
          <Button
            to={"/partner/addflights"}
            className="bg-blue-700 text-white p-5 ml-3"
            onClick={handleShow}
          >
            TẠO CHUYẾN BAY
          </Button>
          <Button
            to={"/partner/addtours"}
            className="bg-blue-700 text-white p-5 ml-3"
            onClick={handleShow}
          >
            TẠO TOUR THAM QUAN DU LỊCH
          </Button>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Partner;
