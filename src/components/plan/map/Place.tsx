'use client'

import { GoogleMapIcon, MyAttractionOffIcon, MyAttractionOnIcon, MyHotelOffIcon, MyHotelOnIcon, MyRestaurantOffIcon, MyRestaurantOnIcon } from "@/assets/svgs";
import Motion from "@/components/motion/Motion";
import useMapStore from "@/stores/useMapStore";
import usePlaceStore from "@/stores/usePlaceStore";
import { PlaceType } from "@/types/place/type";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PlaceProps extends PlaceType {
  addPlace: () => void;
  isOn: boolean;
}

const Place: React.FC<PlaceProps> = ({
  name,
  rate,
  address,
  imageUrl="/",
  placeId,
  types,
  lat,
  lng,

  addPlace,
  isOn,
}) => {

  const {
    map,
  } = useMapStore();

  const {
    setSelectedPlace,
  } = usePlaceStore();

  const altImage = '/images/alt_image.png'

  const handleImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = altImage;
  }

  const handleAddPlace = (e: React.MouseEvent) => {
    e.stopPropagation();
    addPlace();
  }

  const handleClick = () => {
    setSelectedPlace(placeId);
    map?.panTo(new google.maps.LatLng(lat, lng));
  }

  return (
    <AnimatePresence>
      <Motion.MotionDiv
        className={`
        lg:gap-2.5 lg:h-[140px]
        shrink-0 flex flex-row w-full h-[120px] min-h-[120px] rounded-[8px] border border-gray-200 p-2.5 bg-white hover:bg-gray-50 cursor-pointer transition-all-300-out`}
        onClick={handleClick}>
        <div className={`overflow-hidden rounded-[4px] border border-gray-200 h-full aspect-square shrink-0 relative`}>
          <Image
            className={`object-cover`}
            src={imageUrl}
            fill
            alt={"이미지"}
            onError={handleImage}
            unoptimized />
          <div className={`lg:w-6 w-5`} onClick={handleAddPlace}>
            <AnimatePresence>
              {types?.includes('restaurant') ? (
                isOn ? (
                  <Motion.MotionDiv key={'on'}>
                    <MyRestaurantOnIcon className={`lg:w-6 w-5 absolute right-[6px] bottom-[6px] cursor-pointer`} />
                  </Motion.MotionDiv>
                ) : (
                  <Motion.MotionDiv key={'off'}>
                    <MyRestaurantOffIcon className={`lg:w-6 w-5 absolute right-[6px] bottom-[6px] cursor-pointer`} />
                  </Motion.MotionDiv>
                )
              ) : (
                types?.includes('lodging') ? (
                  isOn ? (
                    <Motion.MotionDiv key={'on'}>
                      <MyHotelOnIcon className={`lg:w-6 w-5 absolute right-[6px] bottom-[6px] cursor-pointer`} />
                    </Motion.MotionDiv>
                  ) : (
                    <Motion.MotionDiv key={'off'}>
                      <MyHotelOffIcon className={`lg:w-6 w-5 absolute right-[6px] bottom-[6px] cursor-pointer`} />
                    </Motion.MotionDiv>
                  )
                ) : (
                  isOn ? (
                    <Motion.MotionDiv key={'on'}>
                      <MyAttractionOnIcon className={`lg:w-6 w-5 absolute right-[6px] bottom-[6px] cursor-pointer`} />
                    </Motion.MotionDiv>
                  ) : (
                    <Motion.MotionDiv key={'off'}>
                      <MyAttractionOffIcon className={`lg:w-6 w-5 absolute right-[6px] bottom-[6px] cursor-pointer`} />
                    </Motion.MotionDiv>
                  )
                )
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className={`lg:gap-2.5 gap-1.5 flex flex-col px-2.5 py-1 overflow-hidden grow`}>
          <p className={`lg:text-[20px] md:text-[16px] text-[14px] truncate`}>{name}</p>
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