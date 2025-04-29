interface ButtonProps{
  text: string;
  className?: string;
}

const Button:React.FC<ButtonProps> = ({
  text,
  className = ``,
}) => {

  return (
    <div 
      className={`
        border border-point bg-point text-white text-[20px] rounded-[22px] px-4 py-2 w-fit h-fit cursor-pointer select-none ${className}`}>
        <p className={`mt-0.5`}>{text}</p>
    </div>
  )
}

export default Button;