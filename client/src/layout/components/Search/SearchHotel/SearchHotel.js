import Datepicker from "react-tailwindcss-datepicker";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import PassengerForm from "../../../../components/PassengerForm/PassengerForm";
import TouristAttraction from "../../../../components/TouristAttraction/TouristAttraction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchHotels } from "../../../../redux/hotelsSlice";
import { ToastContainer, toast } from "react-toastify";
const SearchHotel = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const showPassenger = useRef(null);
  const showAttraction = useRef(null);
  const navigate = useNavigate(); // Updated to use navigate
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers?.customers);
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || ""
  );
  const [datetime, setDatetime] = useState({
    startDate: localStorage.getItem("checkin") || "",
    endDate: localStorage.getItem("checkout") || "",
  });
  const [adults, setAdults] = useState(
    Number(localStorage.getItem("adults")) || 1
  );
  const [children, setChildren] = useState(
    Number(localStorage.getItem("children")) || 0
  );
  const [rooms, setRooms] = useState(
    Number(localStorage.getItem("rooms")) || 1
  );
  const [childrenAges, setChildrenAges] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleChangeDate = (newValue) => {
    setDatetime(newValue);
  };

  const handleSearchChange = (event) => {
    const keySearch = event.target.value;
    setSearchTerm(keySearch.trim() !== "" ? keySearch : "");
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    inputRef.current.focus();
  };

  const handleShowPassenger = (event) => {
    if (
      showPassenger.current &&
      !showPassenger.current.contains(event.target)
    ) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  const handleShowAttraction = (event) => {
    if (
      showAttraction.current &&
      !showAttraction.current.contains(event.target)
    ) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  };

  const handleSubmitValue = (event) => {
    const formData = {
      adults: adults,
      children: children,
      childrenAges: childrenAges,
    };
  };

  const handleSearch = async () => {
    localStorage.setItem("searchTerm", searchTerm);
    localStorage.setItem("checkin", datetime.startDate);
    localStorage.setItem("checkout", datetime.endDate);
    localStorage.setItem("adults", adults);
    localStorage.setItem("children", children);
    localStorage.setItem("rooms", rooms);
    const data = await dispatch(
      SearchHotels({ keySearch: searchTerm, customers })
    );
    setTimeout(() => {
      if (data.payload.status === true) {
        navigate(
          searchTerm &&
            `/stays/searchresults?ss=${encodeURIComponent(
              searchTerm
            )}&checkin=${encodeURIComponent(
              datetime.startDate
            )}&checkout=${encodeURIComponent(
              datetime.endDate
            )}&group_adults=${adults}&no_rooms=${rooms}&group_children=${children}`
        );
      } else {
        toast.error(data.payload.message);
      }
    }, 1000);
  };

  useEffect(() => {
    document.addEventListener("click", handleShowPassenger);
    document.addEventListener("click", handleShowAttraction);
    return () => {
      document.removeEventListener("click", handleShowPassenger);
      document.removeEventListener("click", handleShowAttraction);
    };
  }, []);

  return (
    <>
      <ToastContainer icon={true} />
      <div className="listChild absolute max-w-mw_11 w-w_10 left-2/4 translate-x-trans_x translate-y-trans_y z-10">
        <div className="flex items-center bg-yellow-400 text-black h-14 p-1 rounded font-Nunito">
          <div
            ref={showAttraction}
            onClick={(e) => handleShowPassenger(e)}
            className="flex items-center flex-shrink bg-white rounded flex-1 p-2 mr-1 relative"
          >
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
              ref={inputRef}
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full outline-0 px-2 py-1 "
              type="text"
              required="Vui lòng nhập địa điểm muốn đến"
              placeholder={t("common.search.locations")}
            />
            {searchTerm.length > 0 && (
              <span onClick={handleClearSearch}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                  />
                </svg>
              </span>
            )}
            {showSearch && (
              <TouristAttraction
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            )}
          </div>
          <div className="flex items-center flex-shrink bg-white rounded flex-1 p-2 mr-1">
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
            ref={showPassenger}
            onClick={(e) => handleShowPassenger(e)}
            className="flex items-center flex-shrink bg-white rounded flex-1 p-2 mr-1 relative"
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
            <span>
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="#000"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
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
          <div className="flex items-center flex-shrink text-white mr-1">
            <button
              onClick={handleSearch}
              className="bg-btnSearch text-xl font-bold rounded p-p_9_24"
            >
              {t("common.button.search")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchHotel;
