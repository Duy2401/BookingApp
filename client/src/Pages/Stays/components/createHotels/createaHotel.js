import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateHotel, GetAllHotelType } from "../../../../redux/hotelsSlice";

const CreateHotels = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customers = useSelector((state) => state.customers?.customers);
  const hotelType = useSelector((state) => state.hotels?.hotelsType);
  const [formData, setFormData] = useState({
    customers_id_create: customers?._id || "",
    hotel_name: "",
    hotel_address: "",
    hotel_descriptive: "",
    description_note: [{ note_title: "", note_content: "" }],
    description_generalRules: [{ rules_title: "", rules_content: "" }],
    description_amenities: "",
    hotel_type: "",
    description_images: [],
    hotel_price: "",
  });
  const [displayHotelPrice, setDisplayHotelPrice] = useState(""); // For display formatting

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDynamicChange = (index, e, key) => {
    const { name, value } = e.target;
    const updatedArray = [...formData[key]];
    updatedArray[index] = { ...updatedArray[index], [name]: value };
    setFormData((prevData) => ({ ...prevData, [key]: updatedArray }));
  };

  const handleRemoveItem = (index, key) => {
    const updatedArray = [...formData[key]];
    updatedArray.splice(index, 1);
    setFormData((prevData) => ({ ...prevData, [key]: updatedArray }));
  };

  const handleAddItem = (key, newItem) => {
    const updatedArray = [...formData[key], newItem];
    setFormData((prevData) => ({ ...prevData, [key]: updatedArray }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      description_images: Array.from(e.target.files),
    }));
  };

  const handleArrayChange = (e, key) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, [key]: value.split(",") }));
  };
  const handlePriceChange = (e) => {
    const rawValue = e.target.value;
    setFormData((prevData) => ({ ...prevData, hotel_price: rawValue }));
    setDisplayHotelPrice(formatCurrency(rawValue));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("hotel_name", formData.hotel_name);
      data.append("hotel_address", formData.hotel_address);
      data.append("hotel_descriptive", formData.hotel_descriptive);
      data.append(
        "description_note",
        JSON.stringify(formData.description_note)
      );
      data.append(
        "description_generalRules",
        JSON.stringify(formData.description_generalRules)
      );
      data.append("description_amenities", formData.description_amenities);
      data.append("customers_id_create", formData.customers_id_create);
      data.append("hotel_type", formData.hotel_type);
      data.append("hotel_price", formData.hotel_price);
      formData.description_images.forEach((file) => {
        data.append("description_images", file);
      });
      const dataHotels = await dispatch(
        CreateHotel({ newData: data, customers })
      );
      console.log(dataHotels.payload.data._id);
      navigate(`/partner/addrooms/${dataHotels.payload.data._id}`);
      // handle the response if needed
    } catch (error) {
      console.error("Error creating hotel:", error);
    }
  };
  useEffect(() => {
    dispatch(GetAllHotelType({ customers }));
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Hotel Name:
          <input
            type="text"
            name="hotel_name"
            value={formData.hotel_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Hotel Address:
          <input
            type="text"
            name="hotel_address"
            value={formData.hotel_address}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Hotel Descriptive:
          <textarea
            name="hotel_descriptive"
            value={formData.hotel_descriptive}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Description:
        </label>
        {formData.description_note.map((note, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Note Title:
              <input
                type="text"
                name="note_title"
                value={note.note_title}
                onChange={(e) =>
                  handleDynamicChange(index, e, "description_note")
                }
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>

            <label className="block text-gray-700 font-bold mb-2">
              Note Content:
              <textarea
                name="note_content"
                value={note.note_content}
                onChange={(e) =>
                  handleDynamicChange(index, e, "description_note")
                }
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>

            <button
              type="button"
              onClick={() => handleRemoveItem(index, "description_note")}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Remove Note
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            handleAddItem("description_note", {
              note_title: "",
              note_content: "",
            })
          }
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Note
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Rules:</label>
        {formData.description_generalRules.map((rule, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Rule Title:
              <input
                type="text"
                name="rules_title"
                value={rule.rules_title}
                onChange={(e) =>
                  handleDynamicChange(index, e, "description_generalRules")
                }
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>

            <label className="block text-gray-700 font-bold mb-2">
              Rule Content:
              <textarea
                name="rules_content"
                value={rule.rules_content}
                onChange={(e) =>
                  handleDynamicChange(index, e, "description_generalRules")
                }
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>

            <button
              type="button"
              onClick={() =>
                handleRemoveItem(index, "description_generalRules")
              }
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Remove Rule
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            handleAddItem("description_generalRules", {
              rules_title: "",
              rules_content: "",
            })
          }
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Rule
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Amenities (comma-separated):
          <input
            type="text"
            name="description_amenities"
            value={formData.description_amenities}
            onChange={(e) => handleArrayChange(e, "description_amenities")}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Images:
          <input
            type="file"
            name="description_images"
            multiple
            onChange={handleFileChange}
            className="mt-1 block w-full"
          />
        </label>
        <div className="mt-2 flex gap-2">
          {formData.description_images.length > 0 &&
            formData.description_images.map((file, index) => (
              <div key={index} className="mb-2">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="w-32 h-20 object-cover rounded"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="mb-4">
        <select
          name="hotel_type"
          value={formData.hotel_type}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>
            Select hotel type
          </option>
          {hotelType?.map((type) => (
            <option key={type._id} value={type._id}>
              {type.HotelTypes_name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Price:
          <input
            type="number"
            name="hotel_price"
            value={formData.hotel_price}
            onChange={handlePriceChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
        <div className="mt-2 text-gray-600">{displayHotelPrice}</div>
      </div>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateHotels;
