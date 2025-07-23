import axios from "axios";
import storage from "redux-persist/lib/storage"; // Import the storage from redux-persist

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["accept"] = "application/json";
instance.defaults.timeout = 60000;

// Function to set the access token in the axios instance
export const setAccessToken = (token: string) => {
  if (token) {
    instance.defaults.headers.Authorization = token;
  } else {
    delete instance.defaults.headers.Authorization; // Remove the header if no token
  }
};

const getPersistedToken = async () => {
  try {
    const persistedState = await storage.getItem("persist:auth"); // Get persisted auth state
    if (persistedState) {
      const authState = JSON.parse(persistedState);
      return authState.token ? JSON.parse(authState.token) : null;
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
  }
  return null;
};

//? Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    const token = await getPersistedToken(); // Retrieve the token from persisted storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//? Add a response interceptor
// instance.interceptors.response.use(
//   function (response ) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     const responseObject = {
//       data: response?.data,
//       meta: response?.meta,
//     };
//     return responseObject;
//   }
//   // async function (error) {
//   //   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   //   // Do something with response error
//   //   const config = error.config;
//   //   if (error?.response?.status === 500 && !config.sent) {
//   //     config.sent = true;

//   //     const res = await getNewAccessToken();
//   //     const accessToken = res?.data?.accessToken;
//   //     const user = decodeToken(accessToken);

//   //     // Dispatch action to update the token and user in Redux store
//   //     store.dispatch(setUser({ user: user, token: accessToken }));

//   //     config.headers["Authorization"] = accessToken;
//   //     return instance(config);
//   //   } else {
//   //     const responseObject = {
//   //       statusCode: error?.response?.data?.statusCode || 500,
//   //       message: error?.response?.data?.message || "Something went wrong!!!",
//   //       errorMessages: error?.response?.data?.message,
//   //     };
//   //     return Promise.reject(responseObject); // Reject the promise with the error object
//   //   }
//   // }
// );

export { instance };
