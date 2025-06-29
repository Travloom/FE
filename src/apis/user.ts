import axiosInstance from "./axiosInstance"

export const getUserRequest = async () => {
  try {
    const response = await axiosInstance.get(`/proxy/api/auth/profile`)

    const user = {
      name: response.data.name,
      email: response.data.email,
      profileImageUrl: response.data.profileImageUrl,
    }

    return user;

  } catch (e) {
    console.log(e)

    return null;
  }
}

export const logOutRequest = async () => {
  try {
    await axiosInstance.get(`/proxy/api/auth/logout`)
  } catch (e) {
    console.log(e)
  }
}