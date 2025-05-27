import useMapStore from "@/stores/useMapStore";
import usePlaceStore from "@/stores/usePlaceStore";
import { AnimatePresence, motion } from "framer-motion";
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
  } = usePlaceStore();

  const [markPlaces, setMarkPlaces] = useState(
    selectedToggle === '맛집' ? places.restaurantList :
      selectedToggle === '호텔' ? places.hotelList :
        selectedToggle === '명소' ? places.attractionList :
          places.searchList
  );

  useEffect(() => {
    setMarkPlaces(
      selectedToggle === '맛집' ? places.restaurantList :
        selectedToggle === '호텔' ? places.hotelList :
          selectedToggle === '명소' ? places.attractionList :
            places.searchList
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
        content: renderToDOMElement(Pin),
      });

      marker.addListener("click", () => {
        map.panTo(new google.maps.LatLng(place.lat, place.lng));
        // 필요시 map.setZoom(16); 등 추가
      });

      newMarkers.push(marker);
    });

    // 새 마커 배열 저장
    setMarkers(newMarkers);
  }, [markPlaces, selectedToggle, map]);

  return null;
};

export default Marker;


const Pin = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`outline-0 w-10 aspect-3/4 bg-[url('/svgs/restaurant_marker.svg')] hover:bg-[url('/svgs/restaurant_marker_hover.svg')] transition-all duration-300`} />
    </AnimatePresence>
  )
}

const renderToDOMElement = (Component: React.FC) => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<Component />);
  return container;
};