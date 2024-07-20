import { useEffect, useState } from "react";
import provinces from "../../../../locales/provinces.json";
const Destinations = () => {
  const [desti, setDesti] = useState([]);

  useEffect(() => {
    // Assuming `provinces` is an array you want to filter
    const filteredResults = provinces.filter((item, index) => index < 16); // Filter first 20 items

    setDesti(filteredResults);
  }, []);
  return (
    <div className="grid grid-cols-5 grid-rows-4 gap-4 my-10">
      {desti.map((item, index) => (
        <div className="item hover:cursor-pointer" key={index}>
          <div className="name text-base font-bold">{item.name}</div>
          <div className="quantity text-sm text-textGrey">
            3,9{index} chỗ nghỉ
          </div>
        </div>
      ))}
    </div>
  );
};
export default Destinations;
