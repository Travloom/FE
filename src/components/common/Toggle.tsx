import { Dispatch, SetStateAction } from "react";

interface ToggleProps{
  text: string;
  isActive: boolean;
  setSelectedToggle: Dispatch<SetStateAction<string>>;
}

const Toggle:React.FC<ToggleProps> = ({
  text,
  isActive,
  setSelectedToggle,
}) => {

  const activeStyle = `text-white border border-point bg-point`
  const inactiveStyle = `text-point border border-point bg-white`

  return (
    <div
      className={`
        ${isActive ? activeStyle : inactiveStyle} 
        lg:text-[18px] lg:py-2.5
        text-[14px] py-2 grow rounded-[8px] w-full flex items-center justify-center cursor-pointer transition-all-300-out`}
      onClick={() => setSelectedToggle(text)}>
      <p className={`mt-0.5`}>{text}</p>
    </div>
  )
}

export default Toggle;