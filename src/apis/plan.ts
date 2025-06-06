import axiosInstance from "./axiosInstance"

interface PlanType {
  title: string;
  startDate: Date;
  endDate: Date;
  region: string;
  companions: string;
  people: string;
  theme: string;
}

export const planRecommendRequest = async (Plan: PlanType) => {
  try {
    const response = await axiosInstance.post(`/proxy/api/places`, {
      title: Plan.title,
      startDate: Plan.startDate,
      endDate: Plan.endDate,
      region: Plan.region,
      companions: Plan.companions,
      people: Plan.people,
      theme: Plan.theme,
    })
    return response.data;
  } catch (e) {
    console.log(e)
  }
}