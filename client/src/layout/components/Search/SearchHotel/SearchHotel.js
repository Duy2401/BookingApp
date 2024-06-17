import Button from "../../../../components/Button/button";

const SearchHotel = () => {
  return (
    <div className="absolute max-w-mw_11 w-w_10 left-2/4 translate-x-trans_x translate-y-trans_y">
      <div className="flex items-center bg-yellow-400 text-black h-14 p-1 rounded">
        <div className="flex items-center bg-white rounded flex-1 p-2 mr-1">
          <span className="pl-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 2048 2048"
            >
              <path
                fill="currentColor"
                d="M2048 1152v768h-128v-128H128v128H0v-768h128v113l256-512V128h128v128h1024V128h128v384q27 0 50 10t40 27t28 41t10 50v256q0 39-21 70l149 299v-113zm-896-512v256h512V640zM512 384v384h512V640q0-27 10-50t27-40t41-28t50-10h384V384zm-248 896h1520l-128-256h-504q-27 0-50-10t-40-27t-28-41t-10-50H455zm1656 384v-256H128v256z"
              />
            </svg>
          </span>
          <input
            className="w-full outline-0 px-2 py-1"
            type="text"
            placeholder="Bạn muốn đi đâu"
          />
        </div>
        <div className="flex items-center bg-white rounded flex-1 p-2 mr-1">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 2048 2048"
            >
              <path
                fill="currentColor"
                d="M2048 1152v768h-128v-128H128v128H0v-768h128v113l256-512V128h128v128h1024V128h128v384q27 0 50 10t40 27t28 41t10 50v256q0 39-21 70l149 299v-113zm-896-512v256h512V640zM512 384v384h512V640q0-27 10-50t27-40t41-28t50-10h384V384zm-248 896h1520l-128-256h-504q-27 0-50-10t-40-27t-28-41t-10-50H455zm1656 384v-256H128v256z"
              />
            </svg>
          </span>
          <input
            className="w-full outline-0 px-2 py-1"
            type="datetime-local"
            placeholder="Bạn muốn đi đâu"
          />
        </div>
        <div className="flex items-center bg-white rounded flex-1 p-2 mr-1 ">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 2048 2048"
            >
              <path
                fill="currentColor"
                d="M2048 1152v768h-128v-128H128v128H0v-768h128v113l256-512V128h128v128h1024V128h128v384q27 0 50 10t40 27t28 41t10 50v256q0 39-21 70l149 299v-113zm-896-512v256h512V640zM512 384v384h512V640q0-27 10-50t27-40t41-28t50-10h384V384zm-248 896h1520l-128-256h-504q-27 0-50-10t-40-27t-28-41t-10-50H455zm1656 384v-256H128v256z"
              />
            </svg>
          </span>
          <span className="w-full outline-0 px-2 py-1" type="datetime-local">
            2 người lớn · 0 trẻ em · 1 phòng
          </span>
        </div>
        <div className="flex items-center text-white mr-1">
          <Button className="bg-btnSearch text-xl font-bold rounded p-p_9_24">
            Tìm
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SearchHotel;