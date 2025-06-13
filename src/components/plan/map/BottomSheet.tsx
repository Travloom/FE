import PlaceList from "./PlaceList";
import useBottomSheet from "@/hooks/bottom-sheet/useBottomSheet";
import useBottomSheetStore from "@/stores/useBottomSheetStore";

const BottomSheet = () => {

  const {
    currentHeight
  } = useBottomSheetStore();

  const { sheet, content } = useBottomSheet();

  return (
    <div
      className={`
        md:hidden
        overflow-hidden bottom-0 rounded-t-[16px] w-full absolute z-[101] bg-white border-t border-gray-300 flex flex-row shrink-0 transition-all-300-out`}
      style={{ height: currentHeight }}
      ref={sheet}>
      <div
        className={`overflow-hidden w-full`}>
        <div className={`flex justify-center w-full sticky top-[10px]`}>
          <div className={`self-center w-[40%] h-1 rounded-full bg-gray-200`} />
        </div>
        <div
          className={`absolute bottom-0 h-full w-full px-2.5 pt-3 rounded-bl-[8px]`}>
          <PlaceList scrollRef={content} />
        </div>
      </div>
    </div>
  )
}

export default BottomSheet;