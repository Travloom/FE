const PlanTag = ({text}: {text: string}) => {

  return (
    <div 
      className={`
        lg:text-[14px] 
        rounded-[20px] text-[12px] border px-2 py-1 border-point text-point`}>
      {text}
    </div>
  )
}

export default PlanTag;