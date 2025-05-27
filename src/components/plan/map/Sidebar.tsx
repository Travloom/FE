'use client'

import Toggle from "@/components/common/Toggle";
import { PlaceProps } from "@/types/plan/type";
import { useState } from "react";
import Place from "./Place";
import { RightArrowIcon } from "@/assets/svgs";
import useMapStore from "@/stores/useMapStore";

interface SidebarProps {
  restaurants: PlaceProps[];
  hotels: PlaceProps[];
  attractions: PlaceProps[];
}

const Sidebar: React.FC<SidebarProps> = ({
  restaurants,
  hotels,
  attractions,
}) => {

  const [selectedToggle, setSelectedToggle] = useState("식당");

  const {
    isOpen,
    setIsOpen,
  } = useMapStore();

  return (
    <div
      className={`
        ${isOpen ? `` : `translate-x-[-100%]`}
        lg:w-[420px] 
        md:w-[320px] md:border-r md:border-t-0 md:left-0 md:translate-y-0
        max-md:bottom-0 max-md:rounded-t-[16px]
        w-full translate-y-[50%] absolute z-[101] bg-white h-full border-t border-gray-300 flex flex-row shrink-0 transition-all-300-out`}>
      <div className={`overflow-hidden w-full`}>
        <div
          className={`
          lg:w-[420px] md:w-[320px]
          h-full w-full flex flex-col gap-2.5 p-2.5 rounded-bl-[8px] transition-all-300-out`}>
          <div className={`flex flex-row gap-2.5`}>
            <Toggle text={"식당"} isActive={selectedToggle === "식당"} setSelectedToggle={setSelectedToggle} />
            <Toggle text={"숙소"} isActive={selectedToggle === "숙소"} setSelectedToggle={setSelectedToggle} />
            <Toggle text={"명소"} isActive={selectedToggle === "명소"} setSelectedToggle={setSelectedToggle} />
          </div>
          <div className={`flex flex-col gap-3 overflow-auto`}>
            {selectedToggle === "식당" ? (
              restaurants?.map((place, index) => (
                <Place key={index} name={place.name} rate={place.rate} detail={place.detail} imageUrl={place.imageUrl} />
              ))
            ) : (
              selectedToggle === "숙소" ? (
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
      </div>
      <div
        className={`w-4 h-8 content-center text-gray-300 absolute left-[100%] top-[calc(50%-13px)] z-10 px-0.5 py-1 rounded-r-[8px] bg-white border border-gray-300 border-l-0 cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}>
        <RightArrowIcon className={`${isOpen ? `rotate-180` : ``} w-2.5 transition-all-300-out`} />
      </div>
    </div>
  )
}

export default Sidebar;