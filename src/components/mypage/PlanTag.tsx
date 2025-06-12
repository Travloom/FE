const PlanTag = ({text}: {text: string}) => {

  return (
    <div className={`rounded-[20px] text-[14px] border px-2 py-1 border-point text-point`}>
      {text}
    </div>
  )
}

export default PlanTag;