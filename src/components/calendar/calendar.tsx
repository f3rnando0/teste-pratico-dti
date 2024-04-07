import dayjs, { Dayjs } from "dayjs";
import { generateDate, months } from "../../lib/utils/calendar";
import "./calendar.sass";
import { Dispatch, SetStateAction, useState } from "react";
import { ReactComponent as Previous } from "../../assets/icons/previous.svg";
import { ReactComponent as Next } from "../../assets/icons/next.svg";

type CalendarType = {
  selectDate: Dayjs,
  setSelectDate: Dispatch<SetStateAction<Dayjs>>;
}

const Calendar = ({ selectDate, setSelectDate }: CalendarType) => {
  const days = ["D", "S", "T", "Q", "Q", "S", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

  return (
    <div className="calendar-wrapper">
      <div id="calendar-width">
        <div id="other-wrapper">
          <h1>
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="icons">
            <Previous
              width={20}
              height={20}
              className="icon-style"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className="icon-style"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Hoje
            </h1>
            <Next
              width={20}
              height={20}
              className="icon-style"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="days">
          {days.map((day, index) => {
            return (
              <h1 key={index} className="days-text">
                {day}
              </h1>
            );
          })}
        </div>

        <div className="days">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div key={index} className="calendar-days">
                  <h1
                    className={`${currentMonth ? "" : "darker"} ${
                      today ? "todayBg" : ""
                    } ${
                      selectDate.toDate().toDateString() ===
                      date.toDate().toDateString()
                        ? "bgBlack"
                        : ""
                    } calendarNumber`}
                    onClick={() => {
                      setSelectDate(date);
                    }}
                  >
                    {date.date()}
                  </h1>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
