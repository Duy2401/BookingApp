import React, { useState } from "react";

const CreateFlights = () => {
  const [formData, setFormData] = useState({
    flightNumber: "",
    airline: "",
    departure: {
      airport: "",
      city: "",
      country: "",
      date: "",
      time: "",
    },
    arrival: {
      airport: "",
      city: "",
      country: "",
      date: "",
      time: "",
    },
    duration: "",
    status: "Scheduled",
    aircraft: {
      model: "",
      registration: "",
      capacity: 0,
    },
    fares: [
      {
        class: "",
        price: 0,
        currency: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="flightNumber"
        placeholder="Flight Number"
        value={formData.flightNumber}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="airline"
        placeholder="Airline"
        value={formData.airline}
        onChange={handleChange}
        required
      />
      <h3>Departure</h3>
      <input
        type="text"
        name="departure.airport"
        placeholder="Airport"
        value={formData.departure.airport}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="departure.city"
        placeholder="City"
        value={formData.departure.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="departure.country"
        placeholder="Country"
        value={formData.departure.country}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="departure.date"
        value={formData.departure.date}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="departure.time"
        value={formData.departure.time}
        onChange={handleChange}
        required
      />
      <h3>Arrival</h3>
      <input
        type="text"
        name="arrival.airport"
        placeholder="Airport"
        value={formData.arrival.airport}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="arrival.city"
        placeholder="City"
        value={formData.arrival.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="arrival.country"
        placeholder="Country"
        value={formData.arrival.country}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="arrival.date"
        value={formData.arrival.date}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="arrival.time"
        value={formData.arrival.time}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="duration"
        placeholder="Duration"
        value={formData.duration}
        onChange={handleChange}
        required
      />
      <h3>Aircraft</h3>
      <input
        type="text"
        name="aircraft.model"
        placeholder="Model"
        value={formData.aircraft.model}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="aircraft.registration"
        placeholder="Registration"
        value={formData.aircraft.registration}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="aircraft.capacity"
        placeholder="Capacity"
        value={formData.aircraft.capacity}
        onChange={handleChange}
        required
      />
      <h3>Fares</h3>
      <input
        type="text"
        name="fares[0].class"
        placeholder="Class"
        value={formData.fares[0].class}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="fares[0].price"
        placeholder="Price"
        value={formData.fares[0].price}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="fares[0].currency"
        placeholder="Currency"
        value={formData.fares[0].currency}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateFlights;
