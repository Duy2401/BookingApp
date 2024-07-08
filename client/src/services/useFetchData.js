import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const makeRequest = async ({ url, method, headers = {}, body = null }) => {
  try {
    const response = await axios({
      url,
      method,
      headers,
      data: body,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const useFetchData = () => {
  return useMutation({
    mutationFn: makeRequest,
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};
