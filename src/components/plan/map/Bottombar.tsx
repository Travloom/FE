'use client'

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, PanInfo, useAnimation, useMotionValue } from "framer-motion";
import PlaceList from "./PlaceList";

const Bottombar = () => {

  const SNAP_TOP = 2;
  const [snapBottom, setSnapBottom] = useState(Math.max(window.innerHeight - 435, 100));
  const THRESHOLD = 50;

  const yMotion = useMotionValue(snapBottom);


  const divRef = useRef(null);

  const controls = useAnimation();

  const handleDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    const dragOffset = info.offset.y;

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
      const newSnap = Math.max(window.innerHeight - 435, 100);
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
            className={`h-full w-full px-2.5 pt-3 pb-4 rounded-bl-[8px]`}>
            <PlaceList/>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Bottombar;