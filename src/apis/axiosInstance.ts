import axios from "axios"

const axiosInstance = axios.create({
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      try {
        const response = await axios.post(
          "/proxy/api/auth/refresh",
          {},
          { withCredentials: true }
        );
        
        return axiosInstance(originalRequest);
      } catch (e) {
        console.log(e)
      }
    }
  }
)


export default axiosInstance;