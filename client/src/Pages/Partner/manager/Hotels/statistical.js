import { useEffect, useState } from 'react';
import { getAllPayment } from '../../../../redux/paymentSlice';
import { useDispatch, useSelector } from 'react-redux';

const Statistical = ({ hotelID }) => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers?.customers);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(
        getAllPayment({ hotelID: hotelID, customers })
      );
      setChartData(data.payload.data);
    };
    fetchData();
  }, [hotelID]);

  console.log(chartData);

  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold mb-4">Thống kê doanh thu</h2>
      <div>
        {chartData.map((data, index) => (
          <div key={index}>
            <span className="bg-gray-100 inline-block text-gray-800 text-base font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
              <div>
                Tháng {data._id.month} / {data._id.year}
              </div>
              <div>Có doanh thu là {data.totalRevenue}</div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Statistical;
