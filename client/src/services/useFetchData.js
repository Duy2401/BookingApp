import axios from "axios";
import { useMutation } from "react-query";

const mutateData = async (data) => {
  const response = await axios.post(data.url, data.body);
  return response.data;
};
export const usePostData = () => {
  return useMutation(mutateData, {
    onSuccess: (data) => {
      console.log("Gởi dữ liệu thành công");
    },
    onError: (error) => {
      console.error("Gởi dữ liệu thất bại:", error);
    },
  });
};
