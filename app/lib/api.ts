import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-hot-toast";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://randomsaas.azurewebsites.net";

interface ApiRequestConfig extends AxiosRequestConfig {
  showSuccessToast?: boolean;
  successMessage?: string;
}

export const apiRequest = async ({
  method = "GET",
  url,
  data,
  headers,
  showSuccessToast = false,
  successMessage = "Success!",
  ...config
}: ApiRequestConfig) => {
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
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.detail ||
      error.message ||
      "Something went wrong";
    console.log("message : ", message);
    // toast.error(message);
    throw error;
  }
};
