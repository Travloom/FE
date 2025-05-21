'use client'

import Toggle from "@/components/common/Toggle";
import { PlaceProps } from "@/types/plan/type";
import { useEffect, useRef, useState } from "react";
import Place from "./Place";
import { AnimatePresence, motion, useAnimation, useMotionValue } from "framer-motion";

interface PlaceListProps {
  restaurants: PlaceProps[];
  hotels: PlaceProps[];
  attractions: PlaceProps[];
}

const PlaceListMobile: React.FC<PlaceListProps> = ({
  restaurants,
  hotels,
  attractions,
}) => {

  const SNAP_TOP = 2;
  const [snapBottom, setSnapBottom] = useState(420);
  const THRESHOLD = 50;

  const yMotion = useMotionValue(snapBottom);

  const [selectedToggle, setSelectedToggle] = useState("식당");

  const divRef = useRef(null);

  const controls = useAnimation();

  const handleDragEnd = (_: any, info: any) => {
    const dragOffset = info.offset.y;

    console.log(dragOffset)
    console.log(yMotion.get())

    if (dragOffset < - THRESHOLD) {
      controls.start({ y: SNAP_TOP, transition: { type: 'spring', stiffness: 300, damping: 30 } });
      yMotion.set(SNAP_TOP)
    }
    else if (dragOffset > THRESHOLD) {
      controls.start({ y: snapBottom, transition: { type: 'spring', stiffness: 300, damping: 30 } });
      yMotion.set(snapBottom)
    }
    else
      controls.start({ y: yMotion.get(), transition: { type: 'spring', stiffness: 300, damping: 30 } });
  }

  useEffect(() => {
    function updateSnapBottom() {
      const newSnap = Math.max(window.innerHeight - 370, 100);
      setSnapBottom(newSnap);
      yMotion.set(newSnap);
      controls.start({ y: newSnap });
    }

    updateSnapBottom();
    window.addEventListener("resize", updateSnapBottom);

    yMotion.set(snapBottom);            // yMotion의 실제 위치 설정
    controls.start({ y: snapBottom });  // 애니메이션 초기 위치 설정

    return () => {
      window.removeEventListener("resize", updateSnapBottom);
    };

  }, []);

  const stopDragPropagation = (e: React.PointerEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={divRef}
        drag='y'
        dragConstraints={{ top: 80, bottom: 400 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={controls}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`
          md:hidden 
          rounded-t-[16px] w-full absolute z-[101] bg-white h-full border-t border-gray-300 flex flex-row shrink-0 transition-all-300-out`}>
        <div
          className={`overflow-hidden w-full`}>
            <div className={`justify-items-center w-full sticky top-[10px]`}>
              <div className={`self-center w-[40%] h-1 rounded-full bg-gray-200`} />
            </div>
          <div
            className={`h-full w-full flex flex-col gap-2.5 px-2.5 pt-6 pb-4 rounded-bl-[8px] transition-all-300-out`}>
            <div
              className={`flex flex-col gap-2.5 overflow-auto`}
              onPointerMove={stopDragPropagation}>
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
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PlaceListMobile;