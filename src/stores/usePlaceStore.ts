import { PlaceType as PlaceType } from "@/types/place/type";
import { create } from "zustand";

type Category = 'restaurantList' | 'hotelList' | 'attractionList' | 'searchList'

type PlacesType = {
  restaurantList: PlaceType[];
  hotelList: PlaceType[];
  attractionList: PlaceType[];
  searchList: PlaceType[] | null;
}

interface PlaceState {
  places: PlacesType;
  selectedPlaceId: string | null;
  selectedToggle: string;

  setPlaces: (category: Category, newPlaces: PlaceType[]) => void;
  setSelectedPlaceId: (value: string) => void;
  setSelectedToggle: (value: string) => void;

  
  isPending: boolean;

  setIsPending: (value: boolean) => void;
}

const usePlaceStore = create<PlaceState>((set) => ({
  places: {
    restaurantList: [],
    hotelList: [],
    attractionList: [],
    searchList: null,
  },
  selectedPlaceId: null,
  selectedToggle: "맛집",

  isPending: false,

  setPlaces: (category: Category, newPlaces: PlaceType[] | google.maps.places.PlaceResult[] | null) =>
    set((state) => ({
      places: {
        ...state.places,
        [category]: newPlaces,
      },
    })),
  setSelectedPlaceId: (value: string) => set({selectedPlaceId: value}),
  setSelectedToggle: (value: string) => set({selectedToggle: value}),

  setIsPending: (value: boolean) => set({isPending: value}),
}));

export default usePlaceStore;