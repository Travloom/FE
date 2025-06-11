interface ButtonProps{
  text: string;
  isActive: boolean;
  isDelete?: boolean;
  className?: string;
}

const Button:React.FC<ButtonProps> = ({
  text,
  isActive,
  isDelete,
  className = ``,
}) => {

  return (
    <div 
      className={`
        ${isDelete ? `bg-white text-red-400 border-red-400 hover:text-white hover:bg-red-400 transition-all-300-out` : 
          `${isActive ? `bg-point text-white` : `bg-white text-point`} border-point`}
        lg:text-[18px] lg:px-3 lg:py-1.5
        text-[14px] px-3 py-1.5 border rounded-[22px] w-fit h-fit cursor-pointer select-none ${className}`}>
        <p className={`mt-0.5`}>{text}</p>
    </div>
  )
}

export default Button;