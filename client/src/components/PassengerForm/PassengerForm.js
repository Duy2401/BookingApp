import React, { useState } from "react";
const PassengerForm = (props) => {
  const [adultTickets, setAdultTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      adultTickets: adultTickets,
      childTickets: childTickets,
    };
    props.onSubmit(formData);
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="absolute bg-white p-2.5 right-28 rounded top-16 min-w-mw_326 shadow-box_shawdow_200">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium">Số người lớn:</label>
          <input
            type="number"
            id="adult-tickets"
            className="rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            min="1"
            max="30"
            value={adultTickets}
            onChange={(e) => setAdultTickets(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium">Số trẻ em:</label>
          <input
            type="number"
            id="child-tickets"
            className="rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            min="1"
            max="30"
            value={childTickets}
            onChange={(e) => setChildTickets(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full text-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Xong
        </button>
      </div>
    </form>
  );
};
export default PassengerForm;
