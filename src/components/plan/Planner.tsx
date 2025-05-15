import { useState } from "react";
import Toggle from "../common/Toggle";
import Scheduler from "./schedule/Scheduler";
import PlaceList from "./map/PlaceList";
import { PlaceItems } from "@/mocks/places";
import MapContent from "./map/MapContent";

const Planner = () => {

  const [selectedToggle, setSelectedToggle] = useState("일정");

  return (
    <div className={`border border-gray-300 rounded-[8px] bg-white h-full overflow-hidden`}>
      <div className={`flex flex-row gap-2.5 p-2.5 w-full border-b border-gray-300 grow shrink-0`}>
        <Toggle text={"일정"} isActive={selectedToggle === "일정"} setSelectedToggle={setSelectedToggle} />
        <Toggle text={"지도"} isActive={selectedToggle === "지도"} setSelectedToggle={setSelectedToggle} />
      </div>
      <div>
        {selectedToggle === "일정" ? (
          <Scheduler />
        ) : (
          <div className={`flex flex-row h-[540px]`}>
            <PlaceList restaurants={PlaceItems.restaurants} hotels={PlaceItems.hotels} attractions={PlaceItems.attractions} />
            <MapContent />
          </div>
        )}
      </div>
    </div>
  )
}

export default Planner;