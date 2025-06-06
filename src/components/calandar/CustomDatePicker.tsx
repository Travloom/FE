'use client'

import useHomeStore from "@/stores/useHomeStore";
import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";

const CustomDatePicker = () => {

  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useHomeStore();

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  }

  const CustomDateInput = forwardRef<HTMLDivElement, { value: string; onClick: () => void, selectedDate: Date | null, label: string }>(
    ({ value, onClick, selectedDate, label }, ref) => {
      return (
        <div
          className={`${selectedDate ? `text-point border-point w-[202px]` : `text-gray-300 border-gray-300 w-[60px]`} bg-white text-[18px] w-fit h-fit px-3 py-1.5 rounded-[20px] border text-center select-none cursor-pointer transition-all-300-out`}
          onClick={onClick}
          ref={ref}>
          <p className={`mt-0.5`}>{value || label}</p>
        </div>
      );
    }
  )

  return (
    <div className={`w-fit h-fit flex justify-center`}>
      <DatePicker
        key={'DatePicker'}
        className={`relative`}
        dateFormat={'yy.MM.dd'}
        minDate={new Date('2000-01-01')}
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        placeholderText='날짜를 선택해주세요.'
        customInput={
          <CustomDateInput
            value={''}
            onClick={() => { }}
            selectedDate={startDate}
            label='일정' />}
        popperClassName='datepicker-fade-in'
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={`flex items-center justify-center gap-2 font-[GmarketSansLight] `}>
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>
            <p className={`mb-1`}>{date.getFullYear()}년 {date.getMonth() + 1}월</p>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
        )}
      >
        <div className={`absolute w-3 h-3 -top-[7px] left-[calc(50%-6px)] -rotate-45 border-t border-r border-point bg-white`} />
      </DatePicker>
    </div>
  )
}

export default CustomDatePicker;

