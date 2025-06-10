import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import koLocale from '@fullcalendar/core/locales/ko';
import { useEffect, useRef, useState } from 'react';
import { EventContentArg } from '@fullcalendar/core/index.js';
import { useQuery } from '@tanstack/react-query';
import { getPlansRequest } from '@/apis/plan';
import dayjs from 'dayjs';
import usePageAnimateRouter from '@/hooks/common/usePageAnimateRouter';

interface EventState {
  uuid: string;
  title: string;
  startDate: string;
  endDate: string;
}

const CustomFullCalendar = () => {

  const calendarRef = useRef(null);

  const pageAnimateRouter = usePageAnimateRouter();

  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);

  const { data: events } = useQuery({
    queryKey: ['getPlans', 'calendar', year, month],
    queryFn: () => getPlansRequest({ year: year || 0, month: month || 1 }),
  })

  function addOneDay(dateStr: string): string {
    return dayjs(dateStr).add(1, 'day').format('YYYY-MM-DD');
  }

  function renderEventContent(eventInfo: EventContentArg) {

    return (
      <div
        className={`bg-point my-[1px] p-0.5 rounded-[4px] cursor-pointer`}
        onClick={() => pageAnimateRouter.push(`/${eventInfo.event.extendedProps.planId}`)}>
        <p
          className={`
          lg:text-[14px] lg:h-[16px]
          md:text-[10px] md:h-[12px]
          text-[8px] h-[10px] flex justify-center items-center`}>{eventInfo.event.title}</p>
      </div>
    )
  }

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
        datesSet={(arg => {
          setYear(arg.start.getFullYear());
          setMonth(arg.start.getMonth() + 1);
        })}
        events={events?.map((event: EventState) => ({
          title: event.title,
          start: event.startDate,
          end: addOneDay(event.endDate),
          extendedProps: {
            planId: event.uuid,
          }
        }))}
        eventContent={renderEventContent} />
    </div>
  )
}

export default CustomFullCalendar;