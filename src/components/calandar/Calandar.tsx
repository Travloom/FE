import Calendar from "react-calendar";

const Calandar = () => {

  const date = new Date();

  const formatWeekday = (locale: string | undefined, date: Date) => {
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return weekdays[date.getDay()];
  }

  return (
    <div className={`p-2`}>
      <Calendar
        calendarType="gregory"
        locale="ko"
        formatShortWeekday={formatWeekday}
        value={date}
        // tileContent={addContent}
        />
    </div>
  )
}

export default Calandar;