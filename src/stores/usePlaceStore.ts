import { ListCategory, PlacesType, PlaceType as PlaceType } from "@/types/place/type";
import { create } from "zustand";


interface PlaceState {
  places: PlacesType;
  selectedPlaceId: string | null;
  selectedCategory: string;

  setPlaces: (category: ListCategory, newPlaces: PlaceType[] | null) => void;
  setSelectedPlaceId: (value: string) => void;
  setSelectedCategory: (value: string) => void;

  
  isPending: boolean;

  setIsPending: (value: boolean) => void;
}

const usePlaceStore = create<PlaceState>((set) => ({
  places: {
    restaurantList: [],
    cafeList: [],
    hotelList: [],
    attractionList: [],
    searchList: null,
  },
  selectedPlaceId: null,
  selectedCategory: "맛집",

  isPending: false,

  setPlaces: (category: ListCategory, newPlaces: PlaceType[] | null) =>
    set((state) => ({
      places: {
        ...state.places,
        [category]: newPlaces,
      },
    })),
  setSelectedPlaceId: (value: string) => set({selectedPlaceId: value}),
  setSelectedCategory: (value: string) => set({selectedCategory: value}),

  setIsPending: (value: boolean) => set({isPending: value}),
}));

export default usePlaceStore;