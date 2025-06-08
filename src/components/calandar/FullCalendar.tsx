import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import koLocale from '@fullcalendar/core/locales/ko';
import { useRef } from 'react';
import { EventContentArg } from '@fullcalendar/core/index.js';

const CustomFullCalendar = () => {

  const events = [
    { title: "여행", start: '2025-06-05', end: '2025-06-10' },
    { title: "여행", start: '2025-06-09', end: '2025-06-12' },
  ]

  const calendarRef = useRef(null);

  return (
    <div 
      className={`
        lg:rounded-[8px] lg:border
        border-t border-gray-200 w-full h-full p-4 bg-white`}>
      <FullCalendar
        locale={koLocale}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next'
        }}
        dayHeaderContent={(args) => {
          const englishWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          return englishWeekdays[args.date.getDay()];
        }}
        ref={calendarRef}

        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        titleFormat={(date) => {
          const year = date.start.year
          const month = date.start.month + 1
          return `${year}년 ${month}월`;
        }}
        weekends={true}
        dayMaxEventRows={true}
        events={events.map(event => ({
          ...event,
          end: addOneDay(event.end),
        }))}
        eventContent={renderEventContent}>

      </FullCalendar>
    </div>
  )
}

function addOneDay(dateStr: string): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0]; // 'YYYY-MM-DD' 포맷으로 반환
}

function renderEventContent(eventInfo: EventContentArg) {
  return (
    <div className={`bg-point my-[1px] p-0.5 rounded-[4px]`}>
      <b>{eventInfo.timeText}</b>
      <p 
        className={`
          lg:text-[14px] lg:h-[16px]
          md:text-[10px] md:h-[12px]
          text-[8px] h-[10px] flex justify-center items-center`}>{eventInfo.event.title}</p>
    </div>
  )
}

export default CustomFullCalendar;