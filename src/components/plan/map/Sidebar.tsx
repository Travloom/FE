'use client'

import { RightArrowIcon } from "@/assets/svgs";
import useMapStore from "@/stores/useMapStore";
import PlaceList from "./PlaceList";
import usePlaceStore from "@/stores/usePlaceStore";

const Sidebar = () => {

  const {
    isOpen,
    setIsOpen,
  } = useMapStore();

  return (
    <div
      className={`
        ${isOpen ? `` : `translate-x-[-100%]`}
        lg:w-[420px] 
        md:w-[320px] md:border-r md:border-t-0 md:left-0 md:translate-y-0 md:flex
        max-md:bottom-0 max-md:rounded-t-[16px]
        hidden w-full translate-y-[50%] absolute z-[101] bg-white h-full border-t border-gray-300 flex-row shrink-0 transition-all-300-out`}>
      
      <PlaceList/>

      <div
        className={`w-4 h-8 content-center text-gray-300 absolute left-[100%] top-[calc(50%-13px)] z-10 px-0.5 py-1 rounded-r-[8px] bg-white border border-gray-300 border-l-0 cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}>
        <RightArrowIcon className={`${isOpen ? `rotate-180` : ``} w-2.5 transition-all-300-out`} />
      </div>
    </div>
  )
}

export default Sidebar;