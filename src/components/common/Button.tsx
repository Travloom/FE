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
        border border-point text-[20px] rounded-[22px] px-4 py-2 w-fit h-fit cursor-pointer select-none ${className}`}>
        <p className={`mt-0.5`}>{text}</p>
    </div>
  )
}

export default Button;