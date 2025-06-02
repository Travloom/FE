import axiosInstance from "./axiosInstance"

interface TagType {
  title: string;
  region: string;
  itinerary: string;
  companions: string;
  people: string;
  theme: string;
}

export const planRecommendRequest = async (tags: TagType) => {
  try {
    const response = await axiosInstance.post(`/api/api/places`, {
      title: tags.title,
      region: tags.region,
      itinerary: tags.itinerary,
      companions: tags.companions,
      people: tags.people,
      theme: tags.theme,
    })
    console.log(response)
  } catch (e) {
    console.log(e)
  }
}