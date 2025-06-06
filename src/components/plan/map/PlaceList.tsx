import Toggle from "@/components/common/Toggle";
import Place from "./Place";
import SearchHeader from "./SearchHeader";
import usePlaceStore from "@/stores/usePlaceStore";
import { usePlaceManage } from "@/hooks/place/usePlaceManage";
import { useParams } from "next/navigation";
import { HashLoader } from "react-spinners";
import { RefObject, useEffect, useRef } from "react";
import useBottomSheetStore from "@/stores/useBottomSheetStore";
import { MID_HEIGHT } from "@/constants/Map";

interface PlaceListProp {
  scrollRef?: RefObject<HTMLDivElement | null>
}

const PlaceList: React.FC<PlaceListProp> = ({
  scrollRef
}) => {

  const {
    places,
    selectedPlaceId,
    selectedCategory,
    setSelectedCategory,
  } = usePlaceStore();

  const {
    currentHeight,
    setCurrentHeight,
  } = useBottomSheetStore();

  const {
    isPending,
  } = usePlaceStore();

  const { planId } = useParams();

  const placeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const planIdStr = typeof planId === "string" ? planId : Array.isArray(planId) ? planId[0] : "";

  const placeManage = usePlaceManage(planIdStr);

  useEffect(() => {
    const focusPlace = async () => {
      if (currentHeight !== MID_HEIGHT) {
        setCurrentHeight(MID_HEIGHT)
      }

      setTimeout(() => {
        if (selectedPlaceId && placeRefs.current[selectedPlaceId]) {
          placeRefs.current[selectedPlaceId]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
    }

    focusPlace();
  }, [selectedPlaceId]);
  
  return (
    <div
      className={`w-full h-full`}>
      <div
        className={`
          lg:w-[420px] md:w-[320px]
          h-full w-full flex flex-col gap-2.5 py-2.5 rounded-bl-[8px] transition-all-300-out`}>
        <div
          className={`flex flex-row gap-2.5 px-2.5`}>
          <Toggle text={"맛집"} isActive={selectedCategory === "맛집"} setSelectedToggle={setSelectedCategory} />
          <Toggle text={"카페"} isActive={selectedCategory === "카페"} setSelectedToggle={setSelectedCategory} />
          <Toggle text={"호텔"} isActive={selectedCategory === "호텔"} setSelectedToggle={setSelectedCategory} />
          <Toggle text={"명소"} isActive={selectedCategory === "명소"} setSelectedToggle={setSelectedCategory} />
          <Toggle text={"검색"} isSearch={true} isActive={selectedCategory === "검색"} setSelectedToggle={setSelectedCategory} />
        </div>
        {selectedCategory === "검색" &&
          <div className={`w-full px-2.5`}>
            <SearchHeader />
          </div>
        }
        <div
          className={`flex flex-col gap-3 overflow-auto h-full pl-2.5 pr-[3px] mr-[7px]`}
          ref={scrollRef}>
          {selectedCategory === "맛집" ? (
            places.restaurantList?.length !== 0 ? (
              places.restaurantList?.map((place) => (
                <Place
                  ref={(el) => { placeRefs.current[place.placeId] = el; }}
                  key={place.placeId + "restaurant"}
                  name={place.name}
                  rate={place.rate}
                  address={place.address}
                  photoReference={place.photoReference || ""}
                  placeId={place.placeId}
                  lat={place.lat}
                  lng={place.lng}
                  types={place.types}
                  isRestaurantOn={placeManage.isAlreadyExisted('restaurant', place)}
                  isCafeOn={placeManage.isAlreadyExisted('cafe', place)}
                  isHotelOn={placeManage.isAlreadyExisted('hotel', place)}
                  isAttractionOn={placeManage.isAlreadyExisted('attraction', place)}
                  handleRestaurant={() => placeManage.updatePlace('restaurant', place)}
                  handleCafe={() => placeManage.updatePlace('cafe', place)}
                  handleHotel={() => placeManage.updatePlace('hotel', place)}
                  handleAttraction={() => placeManage.updatePlace('attraction', place)} />
              ))
            ) : (
              <div className={`lg:text-[16px] text-[14px] h-full text-center justify-center items.center text-gray-300 flex flex-col gap-1`}>
                <p>추가된 장소가 없습니다.</p>
                <p>원하는 장소를 추가해보세요!</p>
              </div>
            )
          ) : (
            selectedCategory === "카페" ? (
              places.cafeList?.length !== 0 ? (
                places.cafeList?.map((place) => (
                  <Place
                    ref={(el) => { placeRefs.current[place.placeId] = el }}
                    key={place.placeId + "cafe"}
                    name={place.name}
                    rate={place.rate}
                    address={place.address}
                    photoReference={place.photoReference || ""}
                    placeId={place.placeId}
                    lat={place.lat}
                    lng={place.lng}
                    types={place.types}
                    isRestaurantOn={placeManage.isAlreadyExisted('restaurant', place)}
                    isCafeOn={placeManage.isAlreadyExisted('cafe', place)}
                    isHotelOn={placeManage.isAlreadyExisted('hotel', place)}
                    isAttractionOn={placeManage.isAlreadyExisted('attraction', place)}
                    handleRestaurant={() => placeManage.updatePlace('restaurant', place)}
                    handleCafe={() => placeManage.updatePlace('cafe', place)}
                    handleHotel={() => placeManage.updatePlace('hotel', place)}
                    handleAttraction={() => placeManage.updatePlace('attraction', place)} />
                ))
              ) : (
                <div className={`lg:text-[16px] text-[14px] h-full text-center justify-center items.center text-gray-300 flex flex-col gap-1`}>
                  <p>추가된 장소가 없습니다.</p>
                  <p>원하는 장소를 추가해보세요!</p>
                </div>
              )
            ) : (
              selectedCategory === "호텔" ? (
                places.hotelList?.length !== 0 ? (
                  places.hotelList?.map((place) => (
                    <Place
                      ref={(el) => { placeRefs.current[place.placeId] = el }}
                      key={place.placeId + "hotel"}
                      name={place.name}
                      rate={place.rate}
                      address={place.address}
                      photoReference={place.photoReference || ""}
                      placeId={place.placeId}
                      lat={place.lat}
                      lng={place.lng}
                      types={place.types}
                      isRestaurantOn={placeManage.isAlreadyExisted('restaurant', place)}
                      isCafeOn={placeManage.isAlreadyExisted('cafe', place)}
                      isHotelOn={placeManage.isAlreadyExisted('hotel', place)}
                      isAttractionOn={placeManage.isAlreadyExisted('attraction', place)}
                      handleRestaurant={() => placeManage.updatePlace('restaurant', place)}
                      handleCafe={() => placeManage.updatePlace('cafe', place)}
                      handleHotel={() => placeManage.updatePlace('hotel', place)}
                      handleAttraction={() => placeManage.updatePlace('attraction', place)} />
                  ))
                ) : (
                  <div className={`lg:text-[16px] text-[14px] h-full text-center justify-center items.center text-gray-300 flex flex-col gap-1`}>
                    <p>추가된 장소가 없습니다.</p>
                    <p>원하는 장소를 추가해보세요!</p>
                  </div>
                )
              ) : (
                selectedCategory === "명소" ? (
                  places.attractionList?.length !== 0 ? (
                    places.attractionList?.map((place) => (
                      <Place
                        ref={(el) => { placeRefs.current[place.placeId] = el }}
                        key={place.placeId + "attraction"}
                        name={place.name}
                        rate={place.rate}
                        address={place.address}
                        photoReference={place.photoReference || ""}
                        placeId={place.placeId}
                        lat={place.lat}
                        lng={place.lng}
                        types={place.types}
                        isRestaurantOn={placeManage.isAlreadyExisted('restaurant', place)}
                        isCafeOn={placeManage.isAlreadyExisted('cafe', place)}
                        isHotelOn={placeManage.isAlreadyExisted('hotel', place)}
                        isAttractionOn={placeManage.isAlreadyExisted('attraction', place)}
                        handleRestaurant={() => placeManage.updatePlace('restaurant', place)}
                        handleCafe={() => placeManage.updatePlace('cafe', place)}
                        handleHotel={() => placeManage.updatePlace('hotel', place)}
                        handleAttraction={() => placeManage.updatePlace('attraction', place)} />
                    ))
                  ) : (
                    <div className={`lg:text-[16px] text-[14px] h-full text-center justify-center items.center text-gray-300 flex flex-col gap-1`}>
                      <p>추가된 장소가 없습니다.</p>
                      <p>원하는 장소를 추가해보세요!</p>
                    </div>
                  )
                ) : (
                  isPending ? (
                    <div className={`flex justify-center items-center w-full h-full`}>
                      <HashLoader
                        size={30}
                        color={`#6c5ce7`} />
                    </div>
                  ) : (
                    places.searchList ? (
                      
                      places.searchList.length !== 0 ? (
                        places.searchList?.map((place) => (
                          <Place
                            ref={(el) => { placeRefs.current[place.placeId] = el }}
                            key={place.placeId}
                            name={place.name}
                            rate={place.rate}
                            address={place.address}
                            photoReference={place.photoReference ?? ''}
                            placeId={place.placeId}
                            lat={place.lat}
                            lng={place.lng}
                            types={place.types || []}
                            isRestaurantOn={placeManage.isAlreadyExisted('restaurant', place)}
                            isCafeOn={placeManage.isAlreadyExisted('cafe', place)}
                            isHotelOn={placeManage.isAlreadyExisted('hotel', place)}
                            isAttractionOn={placeManage.isAlreadyExisted('attraction', place)}
                            handleRestaurant={() => placeManage.updatePlace('restaurant', place)}
                            handleCafe={() => placeManage.updatePlace('cafe', place)}
                            handleHotel={() => placeManage.updatePlace('hotel', place)}
                            handleAttraction={() => placeManage.updatePlace('attraction', place)} />
                        ))
                      ) : (
                        <div className={`lg:text-[16px] text-[14px] h-full text-center justify-center items.center text-gray-300 pb-[15%] flex flex-col gap-1`}>
                          <p>검색 결과가 없습니다.</p>
                          <p>검색어를 확인해주세요.</p>
                        </div>
                      )
                    ) : (
                      <div className={`lg:text-[16px] text-[14px] h-full text-center content-center text-gray-300 pb-[15%]`}>
                        원하는 장소를 검색해보세요
                      </div>
                    ))))))}
        </div>
      </div>
    </div>
  )
}

export default PlaceList;