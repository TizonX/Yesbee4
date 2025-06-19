import axios from "axios";
import { toast } from "react-hot-toast";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "ttps://randomsaas.azurewebsites.net";

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
      error.response?.data?.message ||
      error.response?.data?.detail ||
      error.message ||
      "Something went wrong";
    toast.error(message);
    throw error;
  }
};
