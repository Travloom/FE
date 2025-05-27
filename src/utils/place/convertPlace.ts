import { PlaceType } from "@/types/place/type";

export const convertToPlaceType = (place: google.maps.places.PlaceResult) : PlaceType => {
  
  return {
    name: place.name ?? "장소 정보가 없습니다",
    rate: place.rating ?? "-",
    address: place.formatted_address ?? place.vicinity ?? "주소 정보가 없습니다",
    imageUrl: place.photos?.[0]?.getUrl() ?? '/',
    placeId: place.place_id || "",
    lat: place.geometry?.location?.lat() || 0,
    lng: place.geometry?.location?.lng() || 0,
    types: place?.types || [],
  }
}