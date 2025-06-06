import Motion from "@/components/motion/Motion";
import useMapStore from "@/stores/useMapStore";
import usePlaceStore from "@/stores/usePlaceStore";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const Marker = () => {
  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);

  const {
    map,
  } = useMapStore();

  const {
    places,
    selectedCategory,
    setSelectedPlaceId
  } = usePlaceStore();

  const [markPlaces, setMarkPlaces] = useState(
    selectedCategory === '맛집' ? places.restaurantList :
      selectedCategory === '카페' ? places.cafeList :
        selectedCategory === '호텔' ? places.hotelList :
          selectedCategory === '명소' ? places.attractionList :
            places.searchList ?? []
  );

  useEffect(() => {
    setMarkPlaces(
      selectedCategory === '맛집' ? places.restaurantList :
        selectedCategory === '카페' ? places.cafeList :
          selectedCategory === '호텔' ? places.hotelList :
            selectedCategory === '명소' ? places.attractionList :
              places.searchList ?? []
    )
  }, [selectedCategory, places])

  useEffect(() => {
    if (!map) return;

    // 기존 마커 제거
    markers?.forEach((marker) => {
      marker.map = null;
    });

    const newMarkers: google.maps.marker.AdvancedMarkerElement[] = [];

    // 새 마커 생성
    markPlaces?.forEach((place) => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: new google.maps.LatLng(place.lat, place.lng),
        content: renderToDOMElement(<Pin placeId={place.placeId} types={place.types} />),
      });

      marker.addListener("click", () => {
        map.panTo(new google.maps.LatLng(place.lat, place.lng));
      });

      newMarkers.push(marker);
    });

    // 새 마커 배열 저장
    setMarkers(newMarkers);

  }, [markPlaces, selectedCategory, map]);

  // 마커 배열이 변경 될 때마다 첫번째 장소로 panTo 실행
  useEffect(() => {
    setSelectedPlaceId(markPlaces[0]?.placeId ?? "")
    if (markPlaces && markPlaces.length > 0 && map) {
      map.panTo(new google.maps.LatLng(markPlaces[0].lat, markPlaces[0].lng));
    }
  }, [markPlaces])

  return null;
};

export default Marker;


const Pin = ({ placeId, types }: { placeId: string, types: string[] }) => {

  const {
    selectedPlaceId,
    setSelectedPlaceId,
    selectedCategory,
  } = usePlaceStore();

  const handleIsActive = () => {
    setSelectedPlaceId(placeId)
  }


  return (
    <AnimatePresence>
      <Motion.MotionDiv
        className={`
          ${selectedCategory === '맛집' ? `${placeId === selectedPlaceId ? `bg-[url('/svgs/restaurant_marker_hover.svg')]` : `bg-[url('/svgs/restaurant_marker.svg')]`} hover:bg-[url('/svgs/restaurant_marker_hover.svg')]` : (
            selectedCategory === '카페' ? `${placeId === selectedPlaceId ? `bg-[url('/svgs/cafe_marker_hover.svg')]` : `bg-[url('/svgs/cafe_marker.svg')]`} hover:bg-[url('/svgs/cafe_marker_hover.svg')]` : (
              selectedCategory === '호텔' ? `${placeId === selectedPlaceId ? `bg-[url('/svgs/hotel_marker_hover.svg')]` : `bg-[url('/svgs/hotel_marker.svg')]`} hover:bg-[url('/svgs/hotel_marker_hover.svg')]` : (
                selectedCategory === '명소' ? `${placeId === selectedPlaceId ? `bg-[url('/svgs/attraction_marker_hover.svg')]` : `bg-[url('/svgs/attraction_marker.svg')]`} hover:bg-[url('/svgs/attraction_marker_hover.svg')]` : (
                  `${placeId === selectedPlaceId ? `bg-[url('/svgs/search_marker_hover.svg')]` : `bg-[url('/svgs/search_marker.svg')]`} hover:bg-[url('/svgs/search_marker_hover.svg')]`
                )
              )
            )
          )}
          outline-0 w-10 aspect-3/4 transition-all duration-300`}
        onClick={handleIsActive} />
    </AnimatePresence>
  )
}

const renderToDOMElement = (Component: React.ReactNode) => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(Component);
  return container;
};