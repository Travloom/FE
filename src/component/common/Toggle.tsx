import { Dispatch, SetStateAction } from "react";

interface ToggleProps{
  text: string;
  isActive: boolean;
  setSelectedPlace: Dispatch<SetStateAction<string>>;
}

const Toggle:React.FC<ToggleProps> = ({
  text,
  isActive,
  setSelectedPlace,
}) => {

  const activeStyle = `text-white border border-point bg-point`
  const inactiveStyle = `text-point border border-point bg-white`

  return (
    <div
      className={`
        ${isActive ? activeStyle : inactiveStyle} 
        text-[20px] rounded-[8px] w-[120px] h-[44px] flex items-center justify-center cursor-pointer transition-all-300-out`}
      onClick={() => setSelectedPlace(text)}>
      <p className={`mt-0.5`}>{text}</p>
    </div>
  )
}

export default Toggle;