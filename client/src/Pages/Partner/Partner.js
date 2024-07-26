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
      <div className="p-4">
        <Button
          to={"/partner/addhotels"}
          className="bg-blue-700 text-white p-5"
          onClick={handleShow}
        >
          TẠO KHÁCH SẠN
        </Button>
      </div>
      <Outlet />
    </>
  );
}

export default Partner;
