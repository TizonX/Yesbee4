import axios from "axios";
import { toast } from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const apiRequest = async ({
  method = "GET",
  url,
  data,
  headers,
  showSuccessToast = false,
  successMessage = "Success!",
  ...config
}) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      data,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...config,
    });

    if (showSuccessToast) {
      toast.success(successMessage);
    }

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.response?.data?.detail ||
      error.message ||
      "Something went wrong";
    toast.error(message);
    throw error;
  }
};
