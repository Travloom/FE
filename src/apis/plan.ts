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

// 플랜 참여 확인
export const isCollaboratorRequest = async (planId: string) => {
  const response = await axiosInstance(`/proxy/api/plan/is-collaborator/${planId}`)
  return response.data
}

// 플랜 목록 조회
export const getPlansRequest = async ({ before, after, year, month }: { before?: Date, after?: Date, year?: number, month?: number }) => {
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

// 장소 추천받아 플랜 생성
export const planRecommendRequest = async (Plan: PlanType) => {
  const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/places`, {
    title: Plan.title,
    startDate: Plan.startDate,
    endDate: Plan.endDate,
    region: Plan.region,
    companions: Plan.companions,
    people: Plan.people,
    theme: Plan.theme,
  })
  return response.data;
}

// 추천 없이 플랜 생성
export const createPlanRequest = async (Plan: PlanType) => {
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
}

export const inviteUserRequest = async (planId: string, email: string) => {
  if (email.trim() !== "") {
    const response = await axiosInstance.post(`/proxy/api/plan/invite/${planId}`, {
      email
    })
    return response.data;
  }
}

// 플랜 삭제제
export const deletePlanRequest = async (planId: string) => {
  await axiosInstance.delete(`/proxy/api/plan/${planId}`);
}

// 플랜 나가기
export const exitPlanRequest = async (planId: string) => {
  await axiosInstance.delete(`/proxy/api/plan/exit/${planId}`);
}