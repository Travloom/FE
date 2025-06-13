import { SearchIcon } from "@/assets/svgs";

interface ToggleProps{
  isSearch?: boolean;
  text: string;
  isActive: boolean;
  setSelectedToggle: (value: string) => void;
}

const Toggle:React.FC<ToggleProps> = ({
  isSearch,
  text,
  isActive,
  setSelectedToggle,
}) => {

  const activeStyle = `text-white border border-point bg-point`
  const inactiveStyle = `text-point border border-point bg-white`

  return (
    <div
      className={`
        ${isSearch ? `aspect-square h-full` : `w-full`}
        ${isActive ? activeStyle : inactiveStyle} 
        lg:text-[18px] lg:py-2.5
        text-[14px] py-2 grow rounded-[8px] flex items-center justify-center cursor-pointer transition-all-300-out select-none`}
      onClick={() => setSelectedToggle(text)}>
      {isSearch ? (
        <SearchIcon className={`h-full`}/>
      ) : (
        <p className={`mt-0.5 whitespace-nowrap`}>{text}</p>
      )}
    </div>
  )
}

export default Toggle;