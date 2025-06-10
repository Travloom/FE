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

// 장소 추천받아 플랜 생성성
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

// 추천 없이 플랜 생성
export const createPlanRequest = async (Plan: PlanType) => {
  try {
    const response = await axiosInstance.post(`/proxy/api/plan`, {
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

// 플랜 목록 조회
export const getPlansRequest = async ({before, after, year, month}: {before?: Date, after?: Date, year?: number, month?: number}) => {
  try {
    const response = await axiosInstance(`/proxy/api/plans`, {
      params: {
        before,
        after,
        year,
        month,
      }
    })
    return response.data;
  } catch (e) {
    console.log(e)
    return null;
  }
}