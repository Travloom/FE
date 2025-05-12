import { KakaoIcon } from "../../../public/svgs";

interface HeaderProps {
  title?: string
}

const Header:React.FC<HeaderProps> = ({
  title,
}) => {

  return (
    <div className={`w-full px-[60px] h-[100px] flex items-center justify-between bg-[rgba(108,92,231,0.15)] text-[40px] border-b border-b-gray-300 shadow-[0_4px_10px_0_rgba(0,0,0,0.1)]`}>
      <p className={`mt-[1.5%] text-point`}>떠나,봄</p>
      {title &&
      <p className={`mt-[1.5%]`}>{title}</p>}
      <KakaoIcon className={`w-12`}/>
    </div>
  )
}

export default Header;