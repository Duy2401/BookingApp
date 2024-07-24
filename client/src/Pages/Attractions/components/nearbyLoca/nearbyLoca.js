import { useEffect, useState } from "react";
import provinces from "../../../../locales/provinces.json";

const NearByLoca = () => {
  const [desti, setDesti] = useState([]);

  useEffect(() => {
    // Assuming `provinces` is an array you want to filter
    const filteredResults = provinces.filter((item, index) => item.image); // Filter first 20 items

    setDesti(filteredResults);
  }, []);
  return (
    <div className="font-Nunito mt-10">
      <div>
        <h1 className="text-2xl font-black my-1 mb-3">Các địa điểm nổi bậc</h1>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        {desti.map((value, index) => (
          <div className="relative rounded overflow-hidden" key={index}>
            <img
              class="h-full w-full max-w-full object-cover"
              src={value.image}
              alt=""
            />
            <div className="absolute bottom-0 left-0 -right-0 bg-black opacity-40 top-2/3"></div>
            <div className="absolute bottom-0 left-0 -right-0 top-2/3">
              <p className="text-white pt-4 pl-4">{value.name}</p>
              <p className="text-white pt-1 pl-4">2151 hoạt động</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NearByLoca;
