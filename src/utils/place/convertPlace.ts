import { PlaceType } from "@/types/place/type";

export const convertToPlaceType = (place: google.maps.places.Place) : PlaceType => {

  const photoReference = place.photos?.[0]?.getURI()?.match(/\/photos\/([^\/]+)\/media/)?.[1];

  return {
    name: place.displayName || "장소 정보가 없습니다",
    rate: place.rating || "-",
    address: place.formattedAddress || "주소 정보가 없습니다",
    photoReference: photoReference || "",
    placeId: place.id || "",
    lat: place.location?.lat() || 0,
    lng: place.location?.lng() || 0,
    types: place?.types || [],
  }
}