"use client";
import { useEffect, useContext, useState, use } from "react";
import Calendar from "react-calendar";
import Card from "../card";
import "react-calendar/dist/Calendar.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "@/components/dash_components/styles/MiniCalendar.css";
import { SidebarContext } from "@/app/dashboard/reservations/newreservation/Context";

const MiniCalendar = ({ time }) => {
  let { rev, setRev, search, setSearch } = useContext(SidebarContext);
  const [value, setValue] = useState(new Date());
  useEffect(() => {
    let Days = 0;
    let days = 0;
    let the_time = { [time]: value.toISOString() };
    // setRev({ ...rev, [time]: value.toISOString() });
    if (time === "start_date" && rev.end_date.length > 0) {
      const date1: any = new Date(value);
      const date2: any = new Date(rev.end_date);
      if (date2 < date1) {
        Days = 0;
      } else {
        const differenceInMs = Math.abs(date1 - date2);
        Days = differenceInMs / (1000 * 60 * 60 * 24);
      }
    } else if (time === "end_date" && rev.start_date.length > 0) {
      const date2: any = new Date(value);
      const date1: any = new Date(rev.start_date);
      if (date2 < date1) {
        Days = 0;
      } else {
        const differenceInMs = Math.abs(date1 - date2);
        Days = differenceInMs / (1000 * 60 * 60 * 24);
      }
    } else {
      Days = 0;
    }
    Days <= 0 ? (days = 0) : (days = Days);
    setSearch({ ...search, days: days });
    setRev({ ...rev, ...the_time, amount: Number(days) * search.price });
  }, [value]);

  return (
    <>
      <Card extra="flex w-full h-full flex-col px-3 py-3 border-slate-700 border-2">
        <div className="flex w-full justify-end">
          <button
            className="my-2 w-7 bg-[#000000] text-white rounded-3xl"
            onClick={() => {
              setSearch({ ...search, [time]: false });
            }}
          >
            X
          </button>
        </div>
        <Calendar
          onChange={(e) => {
            setValue(new Date(String(e)));
          }}
          value={value}
          prevLabel={<MdChevronLeft className="ml-1 h-6 w-6 " />}
          nextLabel={<MdChevronRight className="ml-1 h-6 w-6 " />}
          view={"month"}
        />
      </Card>
    </>
  );
};

export default MiniCalendar;
