import React, { useEffect, useRef } from "react";
import Marker from "./Marker";
import useMapStore from "@/stores/useMapStore";

const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const {
    isOpen,
    setMap,
  } = useMapStore();

  useEffect(() => {
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 37.5, lng: 127.0 },
        zoom: 12,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID, //고급 마커에는 지도 ID가 필요합니다. 지도 ID가 누락된 경우 고급 마커를 로드할 수 없습니다.
        disableDefaultUI: true,
        fullscreenControl: false,
        clickableIcons: false,
        minZoom: 3,
      });
      setMap(map);
    }
  }, []);

  return (
    <div className={`${isOpen ? `lg:w-[calc(100%-420px)] md:w-[calc(100%-320px)]` : `w-full `}
          w-full h-full grow !absolute right-0 transition-all-300-out`}>
      <div id={"map"} ref={mapRef} className={`w-full h-full`}>
        <Marker />
      </div>
    </div>
  )
};

export default GoogleMap;