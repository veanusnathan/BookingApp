import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "./../../components/modal/modal";
import Calendars from "components/calendar/calendar";
import toast, { Toaster } from "react-hot-toast";

const CalendarFunc = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rates, setRates] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [totalDays, setTotalDays] = useState(0);

  const room_id = props?.placesId;

  let onSelectedDate = (value, month, year, days) => {
    const daysCheck =
      new Date(`${year}-${month}-${value}`).getTime() / 86400000 -
      new Date(
        `${startDate?.year}-${startDate?.month}-${startDate?.date}`
      ).getTime() /
        86400000;

    setTotalDays(daysCheck);

    if (startDate === null || (startDate !== null && endDate !== null)) {
      console.log("Masuk1");

      setRates(days);
      setStartDate({ date: value, month: month, year: year });
      setEndDate(null);
    } else if (startDate !== null && endDate === null) {
      console.log("Masuk2");

      if (
        new Date(`${year}-${month}-${value}`).getTime() / 86400000 -
          new Date(
            `${startDate.year}-${startDate.month}-${startDate.date}`
          ).getTime() /
            86400000 >
        7
      ) {
        setStartDate(null);
        setTotalPrice(null);
        return toast.error("Cant select more than 7 days");
      }

      if (startDate.month != month) {
        days = [...rates, ...days];
      }

      let calculate = 0;
      const startDateObj = new Date(
        `${startDate?.year}-${startDate?.month}-${startDate?.date}`
      );
      const endDateObj = new Date(`${year}-${month}-${value}`);
      const oneDayMs = 24 * 60 * 60 * 1000; // number of milliseconds in one day
      const numNights = Math.round((endDateObj - startDateObj) / oneDayMs); // calculate number of nights

      for (let i = 0; i < numNights; i++) {
        const dateObj = new Date(startDateObj.getTime() + i * oneDayMs);
        const dateStr = `${dateObj.getFullYear()}-${
          dateObj.getMonth() + 1
        }-${dateObj.getDate()}`;
        const day = days.find(
          (day) =>
            day.date === dateObj.getDate() &&
            day.month === dateObj.getMonth() + 1 &&
            day.year === dateObj.getFullYear()
        );
        if (day) {
          if (day.discount === 0 && day.markup === 0) {
            calculate += props.details[0].price;
          } else if (day.discount > 0) {
            calculate +=
              props.details[0].price -
              props.details[0].price * (day.discount / 100);
          } else if (day.markup > 0) {
            calculate +=
              props.details[0].price +
              props.details[0].price * (day.markup / 100);
          }
        }
      }

      setTotalPrice(calculate);
      setEndDate({ date: value, month: month, year: year });
    }
  };

  return (
    <>
    <div className="flex justify-end absolute w-fit">
      <Toaster />
      {props.buttonopenState && (
        <Calendars
          details={props.details}
          startDate={startDate}
          endDate={endDate}
          funct={onSelectedDate}
        />
      )}

      {props.buttonopenState && (
        <button
          className="my-bg-main h-14 w-48 transition duration-400 font-semibold text-lg text-white relative top-[650px] left-[150px] -translate-x-1/2 rounded-xl"
          onClick={props.closeFunc}
        >
          Close calendar
        </button>
      )}

      {totalDays > 0 && (
        <button
          data-te-target="#transaction"
          data-te-toggle="modal"
          className={
            props.buttonCloseState === false
              ? "my-bg-main h-14 w-48 transition duration-400 font-semibold text-lg text-white relative top-[650px] left-[-43px] -translate-x-1/2 rounded-xl"
              : "my-bg-main h-14 w-48 transition duration-400 font-semibold text-lg text-white relative top-[650px] left-[-43px] -translate-x-1/2 rounded-xl"
          }
        >
          Proceed To checkout
        </button>
      )}
    </div>
    <div className="">
    <Modal
            daysCheck={totalDays}
            placeId={room_id}
            price={totalPrice}
            startDate={startDate}
            endDate={endDate}
            details={props?.details}
            totalGuest={props?.totalGuest}
          />
    </div>
    </>
  );
};

export default CalendarFunc;
