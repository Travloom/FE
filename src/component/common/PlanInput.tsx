import { useEffect, useState } from "react";
import { PlaneIcon } from "../../../public/svgs";

const PlanInput = () => {

  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (title.trim() !== "") setIsActive(true)
    else setIsActive(false)
  }, [title])

  return (
    <div className={`flex justify-between gap-2.5 rounded-full px-6 py-4.5 bg-white border border-gray-300`}>
      <input 
        className={`text-[20px] font-light text-gray-700 placeholder:text-gray-300 grow`}
        placeholder="여행 플랜 이름을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}/>
      <PlaneIcon
        className={`
          ${isActive ? `text-point` : `text-gray-300`}
          w-6 cursor-pointer`}/>
    </div>
  )
}

export default PlanInput;