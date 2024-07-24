import { useState } from "react";
import FromValue from "../../components/FormValue/fromValue";
import { dataHotel } from "../../utils/initialValue/initialValue";
function Partner() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(dataHotel);
  const handleShow = () => {
    setShow((show) => !show);
  };
  return (
    <>
      <div className="p-4">
        <button className="bg-blue-700 text-white p-5" onClick={handleShow}>
          TẠO KHÁCH SẠN
        </button>
      </div>
      {show && <FromValue formData={formData} setFormData={setFormData} />}
    </>
  );
}

export default Partner;
