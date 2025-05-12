import { PlaceProps } from "@/types/Plan/PlaceType";
import Image from "next/image";

const Place: React.FC<PlaceProps> = ({
  name,
  rate,
  detail,
  imageUrl,
}) => {

  return (
    <div className={`flex flex-row gap-2.5 w-full h-[140px] rounded-[8px] border border-gray-200 p-2.5 bg-white`}>
      <div className={`overflow-hidden rounded-[4px] border border-gray-200 h-full aspect-square relative`}>
        <Image
          className={`object-cover`}
          src={imageUrl}
          fill
          alt={"이미지"} />
      </div>
      <div className={`flex flex-col gap-2.5 px-2.5 py-1`}>
        <p className={`text-[20px]`}>{name}</p>
        <div className={`flex flex-col gap-1 text-[16px] text-gray-400`}>
          <p>평점 : {rate}</p>
          <p>{detail}</p>
        </div>
      </div>
    </div>
  )
}

export default Place;