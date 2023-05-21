import { useState } from "react";
import { genetate, months } from "../../../utils/calender_generator";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function CustomCalender({ setDate, start, p }) {
  // console.log(dayjs(p).toDate());
  const dispatch = useDispatch()
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const currentDate = dayjs();
  const [month, setMonth] = useState(
    dayjs(start).month() || currentDate.month()
  );
  const [year, setYear] = useState(dayjs(start).year() || currentDate.year());
  const [selected, setSelected] = useState(currentDate);
  const presentYear = new Date().getFullYear();
  function generateYears() {
    let arr = [];
    for (let i = 0; i < 4; ++i) {
      arr.push(presentYear + i);
    }
    return arr;
  }
  const _years = generateYears();
  return (
    // absolute bottom-[100%] w-[80%] right-[0%]
    <div className="px-4 py-8 h-fit border-[#fff] border-[1px] rounded-md z-[100] text-[#fff] bg-[#000] text-center font-light ">
      <div className="flex justify-between text-[0.85rem] gap-1 mb-4 pt-2">
        <select
          className=" outline-none bg-[#000] text-[#fff]"
          value={year}
          onChange={(e) => {
            setYear(e.currentTarget.value);
          }}
        >
          {_years.map((elem) => {
            return <option value={elem}>{elem}</option>;
          })}
        </select>

        <select
          className=" outline-none bg-[#000] text-[#fff]"
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((elem) => {
            return <option value={elem}>{months[elem]}</option>;
          })}
        </select>
      </div>
      <div>
        <div className="grid grid-cols-7 gap-x-1 gap-y-1 mb-6">
          {days.map((element, index) => {
            return (
              <h4 key={index} className="font-bold text-[0.9rem]">
                {element}
              </h4>
            );
          })}
        </div>
        <div className="grid grid-cols-7 grid-rows-6 gap-x-1 gap-y-3">
          {genetate(month, year, start).map(
            ({ date, istoday, currentMonth, past }, index) => {
              return (
                <h4
                  onClick={() => {
                    if (past) {
                      toast.error("Invalid Date");
                    } else {
                      dispatch(setDate(date.toDate().toDateString()));
                      toast.success("Date selected");
                    }
                  }}
                  key={index}
                  className={`
                    cursor-pointer
                    text-[0.9rem]
                    ${!currentMonth && "font-[100] text-[#858585] "}
                    ${past ? 'cursor-not-allowed line-through text-[red]' : 'hover:text-egreen'}
                    ${
                     (date.isSame(p)) && " border-egreen border-[1px] px-1 "
                   }
                    `}
        
                >
                  {currentMonth ? date.date() : " "}
                </h4>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

//                     
export default CustomCalender;
