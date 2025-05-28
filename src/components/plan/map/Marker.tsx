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
    selectedToggle,
    setSelectedPlace
  } = usePlaceStore();

  const [markPlaces, setMarkPlaces] = useState(
    selectedToggle === '맛집' ? places.restaurantList :
      selectedToggle === '호텔' ? places.hotelList :
        selectedToggle === '명소' ? places.attractionList :
          places.searchList ?? []
  );

  useEffect(() => {
    setMarkPlaces(
      selectedToggle === '맛집' ? places.restaurantList :
        selectedToggle === '호텔' ? places.hotelList :
          selectedToggle === '명소' ? places.attractionList :
            places.searchList ?? []
    )
  }, [selectedToggle, places])

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
        content: renderToDOMElement(<Pin placeId={place.placeId}/>),
      });

      marker.addListener("click", () => {
        map.panTo(new google.maps.LatLng(place.lat, place.lng));
      });

      newMarkers.push(marker);
    });

    // 새 마커 배열 저장
    setMarkers(newMarkers);

  }, [markPlaces, selectedToggle, map]);

  // 마커 배열이 변경 될 때마다 첫번째 장소로 panTo 실행
  useEffect(() => {
    setSelectedPlace(markPlaces[0]?.placeId ?? "")
    if (markPlaces && markPlaces.length > 0 && map) {
      map.panTo(new google.maps.LatLng(markPlaces[0].lat, markPlaces[0].lng));
    }
  }, [markPlaces])

  return null;
};

export default Marker;


const Pin = ({placeId}: {placeId: string}) => {

  const {
    selectedPlace,
    setSelectedPlace,
  } = usePlaceStore();

  const handleIsActive = (e: React.MouseEvent) => {
    setSelectedPlace(placeId)
  }

  return (
    <AnimatePresence>
      <Motion.MotionDiv
        className={`
          ${placeId === selectedPlace ? `bg-[url('/svgs/restaurant_marker_hover.svg')]` : `bg-[url('/svgs/restaurant_marker.svg')]`}
          outline-0 w-10 aspect-3/4 hover:bg-[url('/svgs/restaurant_marker_hover.svg')] transition-all duration-300`} 
        onClick={handleIsActive}/>
    </AnimatePresence>
  )
}

const renderToDOMElement = (Component: React.ReactNode) => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(Component);
  return container;
};