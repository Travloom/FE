'use client'

import useHomeStore from "@/stores/useHomeStore";
import React from "react";
import DatePicker from "react-datepicker";
import { CustomDateInput } from "./CustomDateInput";

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
        popperPlacement="right"
        customInput={
          <CustomDateInput
            value={''}
            onClick={() => { }}
            label='일정'
            startDate={startDate}
            endDate={endDate} />}
        popperClassName='datepicker-fade-in'
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={`flex items-center justify-center gap-2 font-[GmarketSansLight]`}>
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>
            <p className={`mb-1`}>{new Date(date).getFullYear()}년 {new Date(date).getMonth() + 1}월</p>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
        )}>
      </DatePicker>
    </div>
  )
}

export default CustomDatePicker;