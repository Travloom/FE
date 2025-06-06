export interface PlaceType {
  name: string;
  rate: number | string;
  address: string;
  photoReference: string;
  placeId: string;
  lat: number;
  lng: number;

  types: string[];
}

export type Category = 'restaurant' | 'cafe' | 'hotel' | 'attraction';
export type ListCategory = 'restaurantList' | 'cafeList' | 'hotelList' | 'attractionList' | 'searchList'

export type PlacesType = {
  restaurantList: PlaceType[];
  cafeList: PlaceType[];
  hotelList: PlaceType[];
  attractionList: PlaceType[];
  searchList: PlaceType[] | null;
}

export interface TagsType {
  region: string | null;
  people: string | null;
  companions: string | null;
  theme: string | null;
}