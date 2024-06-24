import React from "react";
import Button from "../Button/button";
import { useTranslation } from "react-i18next";
const PassengerForm = ({
  adults,
  setAdults,
  children,
  setChildren,
  childrenAges,
  rooms,
  setRooms,
  seats,
  setSeats,
  setChildrenAges,
  handleSubmitValue,
}) => {
  const { t } = useTranslation();
  const handleChange = {
    changeValue: (value, delta, setValueFunction) => {
      const newValue = value + delta;
      if (newValue > 0) {
        setValueFunction(newValue);
      }
    },
    onIncreaseAdults: () => handleChange.changeValue(adults, 1, setAdults),
    onDecreaseAdults: () => handleChange.changeValue(adults, -1, setAdults),

    onIncreaseChilds: () => {
      setChildren(children + 1);
      updateChildrenAges(children + 1);
    },
    onDecreaseChilds: () => {
      if (children > 0) {
        setChildren(children - 1);
        updateChildrenAges(children - 1);
      }
    },

    onIncreaseRooms: () => handleChange.changeValue(rooms, 1, setRooms),
    onDecreaseRooms: () => handleChange.changeValue(rooms, -1, setRooms),

    onIncreaseSeats: () => handleChange.changeValue(seats, 1, setSeats),
    onDecreaseSeats: () => handleChange.changeValue(seats, -1, setSeats),
  };

  const updateChildrenAges = (newChildren) => {
    const newChildrenAges = [];
    for (let i = 0; i < newChildren; i++) {
      newChildrenAges.push({ id: i, age: 0 });
    }
    setChildrenAges(newChildrenAges);
  };

  const handleChildAgeChange = (event) => {
    const childId = parseInt(event.target.name.split("-")[2]);
    const newAge = parseInt(event.target.value);
    if (newAge >= 0) {
      const updatedChildrenAges = [...childrenAges];
      updatedChildrenAges[childId] = { id: childId, age: newAge };
      setChildrenAges(updatedChildrenAges);
    }
  };
  return (
    <div className="absolute right-0 left-0 p-8 rounded bg-white top-14 shadow-box_shawdow_200 box-border">
      <div className="flex justify-between items-center">
        <label htmlFor="adults">{t("common.search.adults")}</label>

        <div className="flex items-center rounded border-solid border-bder_1 border-border_color_1 mb-1">
          <button
            className="px-1 py-2 w-10 hover:bg-btnText"
            onClick={handleChange.onDecreaseAdults}
          >
            -
          </button>
          <span className="px-1 py-2 w-10 text-center">{adults}</span>
          <button
            className="px-1 py-2 w-10 hover:bg-btnText"
            onClick={handleChange.onIncreaseAdults}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <label htmlFor="children">{t("common.search.childs")}</label>
        <div className="flex items-center rounded border-solid border-bder_1 border-border_color_1 mb-1">
          <button
            className="px-1 py-2 w-10 hover:bg-btnText"
            onClick={handleChange.onDecreaseChilds}
          >
            -
          </button>
          <span className="px-1 py-2 w-10 text-center">{children}</span>
          <button
            className="px-1 py-2 w-10 hover:bg-btnText"
            onClick={handleChange.onIncreaseChilds}
          >
            +
          </button>
        </div>
      </div>
      {rooms && (
        <div className="flex justify-between items-center">
          <label htmlFor="children">{t("common.search.rooms")}:</label>
          <div className="flex items-center rounded border-solid border-bder_1 border-border_color_1 mb-1">
            <button
              className="px-1 py-2 w-10 hover:bg-btnText"
              onClick={handleChange.onDecreaseRooms}
            >
              -
            </button>
            <span className="px-1 py-2 w-10 text-center">{rooms}</span>
            <button
              className="px-1 py-2 w-10 hover:bg-btnText"
              onClick={handleChange.onIncreaseRooms}
            >
              +
            </button>
          </div>
        </div>
      )}
      {seats && (
        <div className="flex justify-between items-center">
          <label htmlFor="children">{t("common.search.seats")}:</label>
          <div className="flex items-center rounded border-solid border-bder_1 border-border_color_1 mb-1">
            <button
              className="px-1 py-2 w-10 hover:bg-btnText"
              onClick={handleChange.onDecreaseSeats}
            >
              -
            </button>
            <span className="px-1 py-2 w-10 text-center">{seats}</span>
            <button
              className="px-1 py-2 w-10 hover:bg-btnText"
              onClick={handleChange.onIncreaseSeats}
            >
              +
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-between flex-wrap mt-1">
        {childrenAges.map((child) => (
          <div key={child.id} className="w-w_50">
            <label className="hidden" htmlFor={`child-age-${child.id}`}></label>
            <input
              type="number"
              className="rounded border-solid border-bder_1 border-border_color_1 mb-1 w-full  px-1 py-1"
              placeholder="Độ tuổi"
              id={`child-age-${child.id}`}
              name={`child-age-${child.id}`}
              max={17}
              value={child.age}
              onChange={handleChildAgeChange}
            />
          </div>
        ))}
      </div>

      <Button
        className="bg-btnSearch w-full rounded mt-2 p-2 text-white"
        onClick={handleSubmitValue}
      >
        {t("common.button.done")}
      </Button>
    </div>
  );
};

export default PassengerForm;
