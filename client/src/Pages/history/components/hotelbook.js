import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const products = [
  {
    id: 1,
    name: "Product 1",
    description: "This is the full description for Product 1.",
    price: "$10.00",
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is the full description for Product 2.",
    price: "$20.00",
  },
  // Add more products as needed
];
const HotelBook = () => {
  const [expandedProductId, setExpandedProductId] = useState(null);

  const toggleProductDetails = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };
  return (
    <div className="container mx-auto p-4">
      <table className=" table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 w-32">
              Mã code / vé
            </th>
            <th scope="col" className="px-6 py-3 w-1/4">
              Tên Khách sạn
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              Thời gian
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              Trạng thái
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              Thành tiền
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b text-base dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 overflow-hidden text-ellipsis whitespace-nowrap">
              <div className="text-base font-semibold">
                66abb3ce0861cf51555a5c6166abb3ce0861cf51555a5c6166abb3ce0861cf51555a5c6166abb3ce0861cf51555a5c61
              </div>
            </td>
            <td className="px-6 py-4 overflow-hidden text-ellipsis whitespace-nowrap">
              HANZ Queen Airport Hotel Saigon
            </td>
            <td className="px-6 py-4 overflow-hidden text-ellipsis whitespace-nowrap">
              <div>
                <p>12:00 PM - 14:00 PM</p>
              </div>
            </td>
            <td className="px-6 py-4 overflow-hidden text-ellipsis whitespace-nowrap">
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                Online
              </div>
            </td>
            <td className="px-6 py-4 overflow-hidden text-ellipsis whitespace-nowrap">
              <a
                href="#"
                type="button"
                data-modal-target="editUserModal"
                data-modal-show="editUserModal"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit user
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default HotelBook;
