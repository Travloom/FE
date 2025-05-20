'use client'

import { useEffect, useState } from "react";
import { PlaneIcon } from "../../assets/svgs";

const PlanInput = () => {

  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (title.trim() !== "") setIsActive(true)
    else setIsActive(false)
  }, [title])

  return (
    <div 
      className={`
      lg:px-6 lg:py-4.5
      px-5 py-3.5 flex justify-between gap-2.5 rounded-full w-full  bg-white border border-gray-300 overflow-hidden transition-all-300-out`}>
      <input 
        className={`
          lg:text-[20px] 
          w-full text-[16px] font-light text-gray-700 placeholder:text-gray-300 grow transition-all-300-out`}
        placeholder="여행 플랜 이름을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}/>
      <PlaneIcon
        className={`
          ${isActive ? `text-point` : `text-gray-300`}
          lg:w-6 w-4 cursor-pointer transition-all-300-out`}/>
    </div>
  )
}

export default PlanInput;