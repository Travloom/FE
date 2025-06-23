'use client'

import CustomFullCalendar from "@/components/calandar/FullCalendar";
import useInitPage from "@/hooks/common/useInitPage";

export default function CalendarPage() {

  useInitPage("캘린더");

  return (
    <div
      className={`
              lg:p-[60px] lg:pt-[140px]
              pt-[70px] gap-2.5 flex flex-col h-full transition-all-300-out`}>
      <CustomFullCalendar />
    </div>
  )
}
