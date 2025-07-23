import { axiosBaseQuery } from "@/axios/axiosBaseQuery";
import { getBaseUrl } from "@/config/envConfig";
import { createApi } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
const baseApiUrl = getBaseUrl();
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: baseApiUrl || "" }),
  endpoints: () => ({}),
  tagTypes: [],
});
