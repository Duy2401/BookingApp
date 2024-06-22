import React, { useState } from "react";

const FormNumber = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(1);
  const [childrenAges, setChildrenAges] = useState([]);

  const handleAdultChange = (event) => {
    const newAdults = parseInt(event.target.value);
    setAdults(newAdults);

    if (newAdults < children) {
      setChildren(newAdults);
      updateChildrenAges(newAdults);
    } else {
      updateChildrenAges(newAdults);
    }
  };

  const handleChildChange = (event) => {
    const newChildren = parseInt(event.target.value);
    setChildren(newChildren);
    updateChildrenAges(newChildren);
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

    const updatedChildrenAges = [...childrenAges];
    updatedChildrenAges[childId] = { id: childId, age: newAge };
    setChildrenAges(updatedChildrenAges);
  };

  return (
    <div className="passenger-input">
      <div>
        <label htmlFor="adults">Người lớn:</label>
        <input
          type="number"
          id="adults"
          name="adults"
          min="1"
          value={adults}
          onChange={handleAdultChange}
          required
        />
      </div>

      <div>
        <label htmlFor="children">Trẻ em:</label>
        <input
          type="number"
          id="children"
          name="children"
          min="0"
          value={children}
          onChange={handleChildChange}
        />
      </div>

      {childrenAges.map((child) => (
        <div key={child.id}>
          <label htmlFor={`child-age-${child.id}`}>
            Độ tuổi trẻ em {child.id + 1}:
          </label>
          <input
            type="number"
            id={`child-age-${child.id}`}
            name={`child-age-${child.id}`}
            min="0"
            value={child.age}
            onChange={handleChildAgeChange}
          />
        </div>
      ))}
    </div>
  );
};

export default FormNumber;
