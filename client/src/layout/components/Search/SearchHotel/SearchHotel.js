import Button from "../../../../components/Button/button";
import Datepicker from "react-tailwindcss-datepicker";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import PassengerForm from "../../../../components/PassengerForm/PassengerForm";
const SearchHotel = () => {
  const { t } = useTranslation();
  const show = useRef(null);
  const [datetime, setDatetime] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [childrenAges, setChildrenAges] = useState([]);

  const handleChangeDate = (newValue) => {
    setDatetime(newValue);
  };

  const handleShowForm = (event) => {
    if (show.current && !show.current.contains(event.target)) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };
  const handleSubmitValue = () => {
    const formData = {
      adults: adults,
      children: children,
      childrenAges: childrenAges,
    };
  };
  useEffect(() => {
    document.addEventListener("click", handleShowForm);
    return () => document.removeEventListener("click", handleShowForm);
  }, []);
  return (
    <div className="listChild absolute max-w-mw_11 w-w_10 left-2/4 translate-x-trans_x translate-y-trans_y">
      <div className="flex items-center bg-yellow-400 text-black h-14 p-1 rounded font-Nunito">
        <div className="flex items-center bg-white rounded flex-1 p-2 mr-1">
          <span className="pl-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 2048 2048"
            >
              <path
                fill="#595959"
                d="M2048 1152v768h-128v-128H128v128H0v-768h128v113l256-512V128h128v128h1024V128h128v384q27 0 50 10t40 27t28 41t10 50v256q0 39-21 70l149 299v-113zm-896-512v256h512V640zM512 384v384h512V640q0-27 10-50t27-40t41-28t50-10h384V384zm-248 896h1520l-128-256h-504q-27 0-50-10t-40-27t-28-41t-10-50H455zm1656 384v-256H128v256z"
              />
            </svg>
          </span>
          <input
            className="w-full outline-0 px-2 py-1 "
            type="text"
            placeholder={t("common.search.locations")}
          />
        </div>
        <div className="flex items-center bg-white rounded flex-1 p-2 mr-1">
          <Datepicker
            separator={"-"}
            displayFormat={"DD/MM/YYYY"}
            placeholder={t("common.search.checkInDate")}
            value={datetime}
            inputClassName="w-full outline-0 pl-8 pr-2 py-1 text-base text-black"
            onChange={handleChangeDate}
            toggleClassName="absolute left-0 h-full mr-2 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed text-iconGrey"
          />
        </div>
        <div
          ref={show}
          onClick={(e) => handleShowForm(e)}
          className="flex items-center bg-white rounded flex-1 p-2 mr-1 relative"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="#595959" strokeWidth="2">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </g>
            </svg>
          </span>
          <span className="w-full outline-0 px-2 py-1">
            {adults} {t("common.search.adults")} . {children}{" "}
            {t("common.search.childs")} . {rooms} {t("common.search.rooms")}
          </span>
          {showForm && (
            <PassengerForm
              adults={adults}
              setAdults={setAdults}
              children={children}
              setChildren={setChildren}
              childrenAges={childrenAges}
              setChildrenAges={setChildrenAges}
              rooms={rooms}
              setRooms={setRooms}
              handleSubmitValue={handleSubmitValue}
            />
          )}
        </div>
        <div className="flex items-center text-white mr-1">
          <Button className="bg-btnSearch text-xl font-bold rounded p-p_9_24">
            {t("common.button.search")}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SearchHotel;
