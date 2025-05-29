export interface PlaceType {
  name: string;
  rate: number | string;
  address: string;
  imageUrl: string;
  placeId: string;
  lat: number;
  lng: number;

  // 'restaurant' | 'lodging'  나머지 -> | 'tourist_attraction' | 'cafe' | 'park' 등등..
  types: string[];
}

