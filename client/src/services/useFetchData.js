import axios from "axios";
import { useMutation } from "react-query";
const makeRequest = async ({ url, method, headers = {}, body = null }) => {
  try {
    const response = await axios({
      url,
      method,
      headers,
      data: body,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const useFetchData = () => {
  return useMutation(makeRequest, {
    onSuccess: (data) => {
      console.log("Gởi dữ liệu thành công");
    },
    onError: (error) => {
      console.error("Gởi dữ liệu thất bại:", error);
    },
  });
};
