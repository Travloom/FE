import moment from 'moment';
import Calendar from "react-calendar";

const CustomCalendar = () => {

  const dayList = [
    {
      planId: '1',
      title: '부산 여행🛳️',
      startDate: '2025-06-8',
      endDate: '2025-06-17',
    },
    {
      planId: '2',
      title: '오사카🌸',
      startDate: '2025-06-15',
      endDate: '2025-06-25',
    },
  ]

  const date = new Date();

  const formatWeekday = (locale: string | undefined, date: Date) => {
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return weekdays[date.getDay()];
  }

  const addContent = ({ date }: { date: Date }) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const contents = [];

    const matchedPlans = dayList.filter((item) =>
      moment(formattedDate).isBetween(item.startDate, item.endDate, undefined, '[]')
    );

    if (matchedPlans.length === 0) return null;

    if (matchedPlans) {
      contents.push(
        matchedPlans.map((plan) => (
          <div
            key={plan.planId + formattedDate}
            className={`w-full text-end truncate text-[8px]`}
          >{plan.title}</div>
        ))
      )
    }
    return (
      <div className={`w-full flex flex-col`}>{contents}</div>
    )
  }

  return (
    <div className={`p-2 w-full h-full`}>
      <Calendar
        className={`p-2.5 rounded-[8px] border border-point`}
        calendarType="gregory"
        next2Label={null}
        prev2Label={null}
        locale="ko"
        formatShortWeekday={formatWeekday}
        value={date}
        tileContent={addContent}
      />
    </div>
  )
}

export default CustomCalendar;