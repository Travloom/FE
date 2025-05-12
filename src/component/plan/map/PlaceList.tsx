'use client'

import Toggle from "@/component/common/Toggle";
import { PlaceProps } from "@/types/Plan/PlaceType";
import { useState } from "react";
import Place from "./Place";

interface PlaceListProps {
  restaurants: PlaceProps[];
  hotels: PlaceProps[];
  attractions: PlaceProps[];
}

const PlaceList: React.FC<PlaceListProps> = ({
  restaurants,
  hotels,
  attractions,
}) => {

  const [selectedPlace, setSelectedPlace] = useState("식당");

  return (
    <div className={`w-[400px] h-full flex flex-col gap-4 p-2.5 rounded-bl-[8px] border-r border-gray-300`}>
      <div className={`flex flex-row gap-2.5`}>
        <Toggle text={"식당"} isActive={selectedPlace === "식당"} setSelectedPlace={setSelectedPlace} />
        <Toggle text={"숙소"} isActive={selectedPlace === "숙소"} setSelectedPlace={setSelectedPlace} />
        <Toggle text={"명소"} isActive={selectedPlace === "명소"} setSelectedPlace={setSelectedPlace} />
      </div>
      <div className={`flex flex-col gap-3`}>
        {selectedPlace === "식당" ? (
          restaurants?.map((place, index) => (
            <Place key={index} name={place.name} rate={place.rate} detail={place.detail} imageUrl={place.imageUrl} />
          ))
        ) : (
          selectedPlace === "숙소" ? (
            hotels?.map((place, index) => (
              <Place key={index} name={place.name} rate={place.rate} detail={place.detail} imageUrl={place.imageUrl} />
            ))
          ) : (
            attractions?.map((place, index) => (
              <Place key={index} name={place.name} rate={place.rate} detail={place.detail} imageUrl={place.imageUrl} />
            ))
          )
        )}
      </div>
    </div>
  )
}

export default PlaceList;