'use client'

import { GoogleMapIcon, MyAttractionOffIcon, MyAttractionOnIcon, MyCafeOffIcon, MyCafeOnIcon, MyHotelOffIcon, MyHotelOnIcon, MyRestaurantOffIcon, MyRestaurantOnIcon } from "@/assets/svgs";
import Motion from "@/components/motion/Motion";
import useMapStore from "@/stores/useMapStore";
import usePlaceStore from "@/stores/usePlaceStore";
import { PlaceType } from "@/types/place/type";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PlaceProps extends PlaceType {
  handleRestaurant: () => Promise<void>;
  handleCafe: () => Promise<void>;
  handleHotel: () => Promise<void>;
  handleAttraction: () => Promise<void>;
  isRestaurantOn: boolean,
  isCafeOn: boolean,
  isHotelOn: boolean,
  isAttractionOn: boolean,
  ref: React.Ref<HTMLDivElement>;

  photoReference: string;
}

const Place: React.FC<PlaceProps> = ({
  name,
  rate,
  address,
  photoReference = "/",
  placeId,
  types,
  lat,
  lng,
  ref,

  handleRestaurant,
  handleCafe,
  handleHotel,
  handleAttraction,
  isRestaurantOn,
  isCafeOn,
  isHotelOn,
  isAttractionOn,
}) => {

  const {
    map,
  } = useMapStore();

  const {
    selectedPlaceId,
    setSelectedPlaceId,
  } = usePlaceStore();

  const altImage = '/images/alt_image.png'

  const handlePlace = (e: React.MouseEvent, type: 'restaurant' | 'cafe' | 'hotel' | 'attraction') => {
    e.stopPropagation();
    switch (type) {
      case 'restaurant':
        handleRestaurant();
        break;
      case 'cafe':
        handleCafe();
        break;
      case 'hotel':
        handleHotel();
        break;
      case 'attraction':
        handleAttraction();
        break;
    }
  }

  const handleClick = () => {
    setSelectedPlaceId(placeId);
    map?.panTo(new google.maps.LatLng(lat, lng));
  }

  return (
    <AnimatePresence>
      <Motion.MotionDiv
        ref={ref}
        className={`
        lg:gap-2.5 lg:h-[140px]
        ${selectedPlaceId === placeId ? `border-point shadow-point` : `border-gray-200`}
        shrink-0 flex flex-row w-full h-[120px] min-h-[120px] rounded-[8px] p-2.5 border bg-white lg:hover:bg-[rgba(108,92,231,0.05)] cursor-pointer transition-all-300-out`}
        onClick={handleClick}>
        <div className={`overflow-hidden rounded-[4px] border border-gray-200 h-full aspect-square shrink-0 relative`}>
          <Image
            className={`object-cover`}
            src={`${photoReference ? `/api/image-proxy?photo_reference=${photoReference}` : altImage}`}
            fill
            alt={"이미지"}
            unoptimized />
          <div className={`lg:w-6 w-5`}>
            <AnimatePresence>
              <div className={`absolute right-[6px] bottom-[6px] flex gap-1.5`}>
                {types?.some(type => ['restaurant', 'food'].includes(type)) && (
                  <div onClick={(e) => handlePlace(e, 'restaurant')}>
                    {isRestaurantOn ? (
                      <Motion.MotionDiv key={'restaurant on'}>
                        <MyRestaurantOnIcon className={`lg:w-6 w-5 cursor-pointer`} />
                      </Motion.MotionDiv>
                    ) : (
                      <Motion.MotionDiv key={'restaurant off'}>
                        <MyRestaurantOffIcon className={`lg:w-6 w-5 cursor-pointer`} />
                      </Motion.MotionDiv>
                    )}
                  </div>
                )}
                {types?.includes('cafe') && (
                  <div onClick={(e) => handlePlace(e, 'cafe')}>
                    {isCafeOn ? (
                      <Motion.MotionDiv key={'cafe on'}>
                        <MyCafeOnIcon className={`lg:w-6 w-5 cursor-pointer`} />
                      </Motion.MotionDiv>
                    ) : (
                      <Motion.MotionDiv key={'cafe off'}>
                        <MyCafeOffIcon className={`lg:w-6 w-5 cursor-pointer`} />
                      </Motion.MotionDiv>
                    )}
                  </div>
                )}
                {types?.includes('lodging') && (
                  <div onClick={(e) => handlePlace(e, 'hotel')}>
                    {isHotelOn ? (
                      <Motion.MotionDiv key={'hotel on'}>
                        <MyHotelOnIcon className={`lg:w-6 w-5 cursor-pointer`} />
                      </Motion.MotionDiv>
                    ) : (
                      <Motion.MotionDiv key={'hotel off'}>
                        <MyHotelOffIcon className={`lg:w-6 w-5 cursor-pointer`} />
                      </Motion.MotionDiv>
                    )}
                  </div>
                )}
                {!types?.some(type => ['restaurant', 'food'].includes(type)) &&
                  !types?.includes('lodging') &&
                  types?.includes('point_of_interest') && (
                    <div onClick={(e) => handlePlace(e, 'attraction')}>
                      {isAttractionOn ? (
                        <Motion.MotionDiv key={'attraction on'}>
                          <MyAttractionOnIcon className={`lg:w-6 w-5 cursor-pointer`} />
                        </Motion.MotionDiv>
                      ) : (
                        <Motion.MotionDiv key={'attraction off'}>
                          <MyAttractionOffIcon className={`lg:w-6 w-5 cursor-pointer`} />
                        </Motion.MotionDiv>
                      )}
                    </div>
                  )}
              </div>
            </AnimatePresence>
          </div>
        </div>
        <div className={`lg:gap-2.5 gap-1.5 flex flex-col px-2.5 py-1 overflow-hidden grow`}>
          <p className={`lg:text-[18px] md:text-[16px] text-[14px] truncate`}>{name}</p>
          <div className={`lg:text-[16px] md:text-[14px] text-[12px] flex flex-col gap-1 text-gray-400`}>
            <p>평점 : {rate}</p>
            <p className={`truncate`}>{address}</p>
          </div>

        </div>
        <div className={`flex flex-col items-center justify-center pr-1`}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.google.com/maps/place/?q=place_id:${placeId}`}>
            <GoogleMapIcon className={`lg:w-6 w-5 flex`} />
          </a>
        </div>
      </Motion.MotionDiv>
    </AnimatePresence>
  )
}

export default Place;