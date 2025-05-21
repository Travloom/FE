interface ButtonProps{
  text: string;
  isActive: boolean;
  className?: string;
}

const Button:React.FC<ButtonProps> = ({
  text,
  isActive,
  className = ``,
}) => {

  return (
    <div 
      className={`
        ${isActive ? `bg-point text-white` : `bg-white text-point`}
        lg:text-[18px] lg:px-3 lg:py-1.5
        text-[14px] px-3 py-1.5 border border-point rounded-[22px] w-fit h-fit cursor-pointer select-none ${className}`}>
        <p className={`mt-0.5`}>{text}</p>
    </div>
  )
}

export default Button;