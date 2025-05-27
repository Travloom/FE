import Toggle from "@/components/common/Toggle";
import Place from "./Place";
import SearchHeader from "./SearchHeader";
import usePlaceStore from "@/stores/usePlaceStore";
import { usePlaceManage } from "@/hooks/place/usePlaceManage";
import { useParams } from "next/navigation";
import { HashLoader } from "react-spinners";

const PlaceList = ({
}) => {

  const {
    places,
    selectedToggle,
    setSelectedToggle,
  } = usePlaceStore();

  const stopDragPropagation = (e: React.PointerEvent) => {
    e.stopPropagation();
  };

  const {
    isPending,
  } = usePlaceStore();

  const { planId } = useParams();

  const planIdStr = typeof planId === "string" ? planId : Array.isArray(planId) ? planId[0] : "";

  const placeManage = usePlaceManage(planIdStr);

  return (
    <div className={`overflow-hidden w-full h-full`}>
      <div
        className={`
          lg:w-[420px] md:w-[320px]
          h-full w-full flex flex-col gap-2.5 p-2.5 rounded-bl-[8px] transition-all-300-out overflow-auto`}>
        <div
          className={`flex flex-row gap-2.5`}
          onPointerMove={stopDragPropagation}>
          <Toggle text={"맛집"} isActive={selectedToggle === "맛집"} setSelectedToggle={setSelectedToggle} />
          <Toggle text={"호텔"} isActive={selectedToggle === "호텔"} setSelectedToggle={setSelectedToggle} />
          <Toggle text={"명소"} isActive={selectedToggle === "명소"} setSelectedToggle={setSelectedToggle} />
          <Toggle text={"검색"} isSearch={true} isActive={selectedToggle === "검색"} setSelectedToggle={setSelectedToggle} />
        </div>
        {selectedToggle === "검색" &&
          <div className={`w-full`}>
            <SearchHeader />
          </div>
        }
        <div className={`flex flex-col gap-3 overflow-auto h-full`}>
          {selectedToggle === "맛집" ? (
            places.restaurantList?.length !== 0 ? (
              places.restaurantList?.map((place) => (
                <Place
                  key={place.placeId}
                  name={place.name}
                  rate={place.rate}
                  address={place.address}
                  imageUrl={place.imageUrl}
                  placeId={place.placeId}
                  lat={place.lat}
                  lng={place.lng}
                  types={place.types}
                  onClick={() => { placeManage.updatePlace(place) }}
                  isOn={placeManage.isAlreadyExisted(place)} />
              ))
            ) : (
              <div className={`lg:text-[16px] text-[14px] h-full text-center justify-center items.center text-gray-300 pb-[15%] flex flex-col gap-1`}>
                <p>추가된 장소가 없습니다.</p>
                <p>원하는 장소를 추가해보세요!</p>
              </div>
            )
          ) : (
            selectedToggle === "호텔" ? (
              places.hotelList?.length !== 0 ? (
                places.hotelList?.map((place) => (
                  <Place
                    key={place.placeId}
                    name={place.name}
                    rate={place.rate}
                    address={place.address}
                    imageUrl={place.imageUrl}
                    placeId={place.placeId}
                    lat={place.lat}
                    lng={place.lng}
                    types={place.types}
                    onClick={() => { placeManage.updatePlace(place) }}
                    isOn={placeManage.isAlreadyExisted(place)} />
                ))
              ) : (
                <div className={`lg:text-[16px] text-[14px] h-full text-center justify-center items.center text-gray-300 pb-[15%] flex flex-col gap-1`}>
                  <p>추가된 장소가 없습니다.</p>
                  <p>원하는 장소를 추가해보세요!</p>
                </div>
              )
            ) : (
              selectedToggle === "명소" ? (
                places.attractionList?.length !== 0 ? (
                  places.attractionList?.map((place) => (
                    <Place
                      key={place.placeId}
                      name={place.name}
                      rate={place.rate}
                      address={place.address}
                      imageUrl={place.imageUrl}
                      placeId={place.placeId}
                      lat={place.lat}
                      lng={place.lng}
                      types={place.types}
                      onClick={() => { placeManage.updatePlace(place) }}
                      isOn={placeManage.isAlreadyExisted(place)} />
                  ))
                ) : (
                  <div className={`lg:text-[16px] text-[14px] h-full text-center justify-center items.center text-gray-300 pb-[15%] flex flex-col gap-1`}>
                    <p>추가된 장소가 없습니다.</p>
                    <p>원하는 장소를 추가해보세요!</p>
                  </div>
                )
              ) : (
                places.searchList ? (
                  isPending ? (
                    <div className={`w-full h-full pb-[20%] content-center justify-items-center`}>
                      <HashLoader
                        size={30}
                        color={`#6c5ce7`} />
                    </div>
                  ) : (
                    places.searchList.length !== 0 ? (
                      places.searchList?.map((place) => (
                        <Place
                          key={place.placeId}
                          name={place.name}
                          rate={place.rate}
                          address={place.address}
                          imageUrl={place.imageUrl}
                          placeId={place.placeId}
                          lat={place.lat}
                          lng={place.lng}
                          types={place.types || []}
                          onClick={() => { placeManage.updatePlace(place) }}
                          isOn={placeManage.isAlreadyExisted(place)} />
                      ))
                    ) : (
                      <div className={`lg:text-[16px] text-[14px] h-full text-center justify-center items.center text-gray-300 pb-[15%] flex flex-col gap-1`}>
                        <p>검색 결과가 없습니다.</p>
                        <p>검색어를 확인해주세요.</p>
                      </div>
                    ))
                ) : (
                  <div className={`lg:text-[16px] text-[14px] h-full text-center content-center text-gray-300 pb-[15%]`}>
                    원하는 장소를 검색해보세요
                  </div>
                ))))}
        </div>
      </div>
    </div>
  )
}

export default PlaceList;