import axios from "axios"

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    Accept: "application/json"
  }
})

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          "/proxy/api/auth/refresh",
          {},
          { withCredentials: true }
        );
        
        return axiosInstance(originalRequest);
      } catch (e) {
        console.log(e)
      }
    }
    return Promise.reject(error);
  }
)


export default axiosInstance;