import PlaceList from "./PlaceList";
import useBottomSheet from "@/hooks/map/useBottomSheet";
import { useEffect, useState } from "react";

const BottomSheet = () => {

  const [sheetHeight, setSheetHeight] = useState(window.innerHeight - 100);

  const { sheet, content } = useBottomSheet();

useEffect(() => {
  const updateSheetHeight = () => {
    setSheetHeight(window.innerHeight - 100);
  };

  updateSheetHeight(); // 초기 실행

  window.addEventListener('resize', updateSheetHeight);

  return () => {
    window.removeEventListener('resize', updateSheetHeight);
  };
}, []);

  return (
    <div
      className={`
        md:hidden
        overflow-hidden bottom-0 rounded-t-[16px] w-full absolute z-[101] bg-white border-t border-gray-300 flex flex-row shrink-0 transition-all-300-out`}
      style={{ height: sheetHeight }}
      ref={sheet}>
      <div
        className={`overflow-hidden w-full`}>
        <div className={`flex justify-center w-full sticky top-[10px]`}>
          <div className={`self-center w-[40%] h-1 rounded-full bg-gray-200`} />
        </div>
        <div
          className={`h-full w-full px-2.5 pt-3 pb-4 rounded-bl-[8px]`}>
          <PlaceList scrollRef={content}/>
        </div>
      </div>
    </div>
  )
}

export default BottomSheet;