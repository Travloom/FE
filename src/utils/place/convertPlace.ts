import { PlaceType } from "@/types/place/type";

export const convertToPlaceType = (place: google.maps.places.PlaceResult) : PlaceType => {
  
  return {
    name: place.name ?? "",
    rate: place.rating ?? "-",
    address: place.formatted_address ?? place.vicinity ?? "",
    imageUrl: place.photos?.[0]?.getUrl() ?? '/',
    placeId: place.place_id || "",
    lat: place.geometry?.location?.lat() || 0,
    lng: place.geometry?.location?.lng() || 0,
    types: place?.types || [],
  }
}