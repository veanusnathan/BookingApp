// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// // import "@fullcalendar/core/main.css";
// // import "@fullcalendar/daygrid/main.css";
// // import "@fullcalendar/timegrid/main.css";


import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";


export default function Calendars(props){
  // console.log(props??rates?..details?.details?.[0]?.price)
  const params = useParams();
  const { id } = params;

  console.log(props)

  const location = useLocation()

  const roomDetails = location.pathname === `/room-details/${id}`
  const editPrice = location.pathname === '/dashboard-edit-price'

  // const price = [
  //   {"date": "2023-03-10", "price": 100000}
  // ]
  
  const [now, setNow] = useState({
    date: 0,
    month: 0, 
    year: 0
  })
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [listMonth, setListMonth] = useState([
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [days, setDays] = useState(0);


  // const [startDate, setStartDate] = useState(null)
  // const [endDate, setEndDate] = useState(null)

  /*
    Function onCreateCalendar digunakan untuk men-generate suatu tanggal dalam 1 bulan, 
    dimana parameter yang dibutuhkan yaitu tahun dan bulan.

    Jadi ada 2 kemungkinan dimana onCreateCalendar ini dijalankan,
    1. Ketika pertama kali user klik book now:
       Apabila baru pertama kali dibuka, maka kita harus mengambil default value dari parameter.
       Yg mana default value nya adalah tahun dan bulan saat ini. 
    2. Ketika calendar sudah dibuka, dan user klik next untuk melihat tanggal di bulan berikutnya atau
       user klik previous untuk melihat tanggal di bulan sebelumnya:
       Apabila user sudah membuka calendar dan ingin melihat bulan berikutnya, maka currentMonth nya
       di increment (ditambahkan 1) atau apabila ingin melihat bulan sebelumnya, maka currentMonth nya
       di decrement (dikurangi 1)
  */
  let onCreateCalendar = async(btn, year1 = new Date().getUTCFullYear(), month1 = new Date().getMonth() + 1) => {
    try {
      const rates = await axios.get(`${process.env.REACT_APP_API_BASE_URL}transaction/rates?room_id=${id}`)
      console.log(rates)

      if(btn === '+'){ // Apabila user meng-klik button "next"
        let curMonth = month // Maka kita ambil currentMonth nya
        curMonth++ // Kemudian currentMonth nya kita tambahkan 1
        let curYear = year // Tidak lupa kita ambil currentYear nya

        /*
          Ada kemungkinan apabila klik next secara terus menerus dan posisi user sudah berada di 
          bulan December (bulan ke-13).
          Maka yg kita lakukan adalah currentMonth nya kita ubah menjadi 1 dan currentYear nya kita
          increment. 
        */
        if(curMonth === 13){ 
            curMonth = 1
            curYear++
        }

        let dates = [];

        for(let i=1; i<=new Date(curYear, curMonth, 0).getDate(); i++){
          if(rates.data.data.length){
            let isDiscount = false
            rates?.data?.data?.forEach(value => {

              if((new Date(`${curYear}-${curMonth.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              })}-${i.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              })}`).getTime() >= new Date(value?.start_date).getTime()) && (new Date(`${curYear}-${curMonth.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              })}-${i.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              })}`).getTime() <= new Date(value?.end_date).getTime())){
                isDiscount = true
                dates.push({date: i, month: curMonth, year: curYear, discount: value?.event_rate?.discount, markup: value?.event_rate?.markup})
              
              }
            })

            if(!isDiscount) dates.push({date: i, month: curMonth, year: curYear, discount: 0, markup: 0 })
          }else{
            dates.push({date: i, month: curMonth, year: curYear, discount: 0, markup: 0 })
          }
        }
        setYear(curYear)
        setMonth(curMonth)
        setDays(dates)
      }else if(btn === '-'){ // Apabila user meng-klik button "previous"
        let curMonth = month // Maka kita ambil currentMonth nya
        curMonth-- // Kemudian currentMonth nya kita kurang 1
        let curYear = year // Tidak lupa kita ambil currentYear nya

        /*
          Ada kemungkinan apabila klik prev secara terus menerus dan posisi user sudah berada di 
          bulan Januari (bulan ke-0).
          Maka yg kita lakukan adalah currentMonth nya kita ubah menjadi 12 dan currentYear nya kita
          Decrement. 
        */
        if(curMonth === 0){
            curMonth = 12
            curYear--
        }

        let dates = [];

        for(let i=1; i<=new Date(curYear, curMonth, 0).getDate(); i++){
          if(rates.data.data.length){
            let isDiscount = false
            rates?.data?.data?.forEach(value => {

              if((new Date(`${curYear}-${curMonth.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              })}-${i.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              })}`).getTime() >= new Date(value?.start_date).getTime()) && (new Date(`${curYear}-${curMonth.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              })}-${i.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              })}`).getTime() <= new Date(value?.end_date).getTime())){
                isDiscount = true
                dates.push({date: i, month: curMonth, year: curYear, discount: value?.event_rate?.discount, markup: value?.event_rate?.markup})
              
              }
            })

            if(!isDiscount) dates.push({date: i, month: curMonth, year: curYear, discount: 0, markup: 0 })
          }else{
            dates.push({date: i, month: curMonth, year: curYear, discount: 0, markup: 0 })
          }
        }
        setYear(curYear)
        setMonth(curMonth)
        setDays(dates)
      }else{ // Apabila calendar pertama kali dibuka
        let dates = [];
        for(let i=1; i<=new Date(year1, month1, 0).getDate(); i++){
          if(rates.data.data.length){ // Cek, apakah ada event yg sedang berjalan di room tersebut?
            // Apabila ada, maka kita ambil event discount/event markup nya, untuk kemudian kita taruh di tanggal yg sudah di set didalam db
            console.log(i)
            console.log('>>>')
            let isDiscount = false
            rates?.data?.data?.forEach(value => {

              if((new Date(`${year1}-${month1.toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false
                })}-${i.toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false
                })}`).getTime() >= new Date(value?.start_date).getTime()) 
                && 
                (new Date(`${year1}-${month1.toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false
                })}-${i.toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false
                })}`).getTime() <= new Date(value?.end_date).getTime())){
                  isDiscount = true
                  dates.push({date: i, month: month1, year: year1, discount: value?.event_rate?.discount, markup: value?.event_rate?.markup})
              }
            })

            if(!isDiscount) dates.push({date: i, month: month1, year: year1, discount: 0, markup: 0 })
          }else{
            console.log('<<<')
            dates.push({date: i, month: month1, year: year1, discount: 0, markup: 0 })
          }
        }

        setYear(year1)
        setMonth(month1)
        setDays(dates)
        setNow({
          date: new Date().getDate(),
          month: month1, 
          year: year1
        })
      }
    } catch (error) {
      console.log(error)
    }
}

// let onSelectedDate = (value, month, year) => {
//   console.log(value)
//   console.log(month)
//   console.log(year)
//   if(startDate === null){
//       console.log('Masuk1')
//       setStartDate({ date: value, month: month, year: year })
//   }else if(startDate !== null && endDate === null){
//       console.log('Masuk2')
//       setEndDate({ date: value, month: month, year: year })
//   }else if(startDate !== null && endDate !== null){
//       console.log('Masuk3')
//       setStartDate({ date: value, month: month, year: year })
//       setEndDate(null)
//   }
// }

useEffect(() => {
    onCreateCalendar()
}, [])

  return (
    <>
    {/* Room Details */}
    {roomDetails &&
    <div className="bg-red-300 w-[300px] h-[402px] absolute top-[240px] bg-white w-max h-96 left-[-10px] md:left-[-35px] border border-gray-300 rounded-lg shadow-md p-[24px] z-[1045]">
    {console.log(props?.details)}
    <h1 className="text-3xl font-bold mb-3">Calendar</h1>
    <h5 className="text-lg font-medium mb-3">
      {year} - {listMonth[month]}
    </h5>
    <div>
      <div className="grid grid-cols-7 gap-3 px-10 h-[230px]">
        {days
          ? days.map((value) => {
              return (
                <>
                  <div
                    className="cursor-pointer w-fit"
                  >
                    <div
                      className={
                        new Date(`${year}-${month}-${value.date}`).getTime() /
                          86400000 >=
                          new Date(
                            `${props?.startDate?.year}-${props?.startDate?.month}-${props?.startDate?.date}`
                          ).getTime() /
                            86400000 &&
                        new Date(`${year}-${month}-${value.date}`).getTime() /
                          86400000 <=
                          new Date(
                            `${props?.endDate?.year}-${props?.endDate?.month}-${props?.endDate?.date}`
                          ).getTime() /
                            86400000
                          ? "border-b-2 border-red-700 cursor-pointer"
                          : value.date < props?.startDate?.date &&
                            month <= props?.startDate?.month &&
                            year <= props?.startDate?.year
                          ? "text-gray-500 cursor-pointer"
                          : null
                      }
                      onClick={
                        (value.date < props?.startDate?.date &&
                        month <= props?.startDate?.month &&
                        year <= props?.startDate?.year ) && (props?.endDate?.endDate === null)? 
                            null
                          : 
                            value.date < now.date && month <= now.month && year <= now.year?
                              null
                            :
                              () => props.funct(value.date, month, year, days)
                      }
                    >
                      <div className={value.date < now.date && month <= now.month && year <= now.year? "text-sm text-center text-gray-200" : "text-sm text-center"}>
                      {value?.date}
                      </div>
                      <div className={value.date < now.date && month <= now.month && year <= now.year? "text-xs text-gray-200" : value?.discount? "text-xs text-green-500" : value?.markup? "text-xs text-red-500" : "text-xs opacity-50"}>
                        {value?.discount? (props?.details?.[0]?.price - (props?.details?.[0]?.price * (value?.discount/100))).toString().slice(0, 3) : value?.markup? (props?.details?.[0]?.price + (props?.details?.[0].price * (value?.markup/100))).toString().slice(0, 3) : props?.details?.[0]?.price.toString().slice(0, 3)  }
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          : null}
      </div>
      <div className="py-3">
        {/* 
          Button previous akan di disabled ketika user berada di bulan saat ini
        */}
        <button disabled={month === now.month && year === now.year? true : false} onClick={() => onCreateCalendar("-")} type="button" className={month === now.month && year === now.year? "py-1 px-2 mr-2 mb-2 text-xs font-xs text-gray-500 focus:outline-none bg-gray-300 rounded-full border bg-gray-300" : "py-1 px-2 mr-2 mb-2 text-xs font-xs text-black-900 focus:outline-none bg-white rounded-full border border-red-700 hover:bg-red-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-white-700 dark:focus:ring-white-700"}>
          Prev
        </button>
        <button onClick={() => onCreateCalendar("+")} type="button" className="py-1 px-2 mr-2 mb-2 text-xs font-xs text-black-900 focus:outline-none bg-white rounded-full border border-red-700 hover:bg-red-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-white-700 dark:focus:ring-white-700">
          Next
        </button>
      </div>
    </div>
  </div>}


  {/* edit Price */}
  {editPrice && 
  <div className="side-box-card bg-red-300 w-[300px] ">
  <h1 className="text-3xl font-bold mb-3">Calendar</h1>
  <h5 className="text-lg font-medium mb-3">
    {year} - {listMonth[month]}
  </h5>
  <div>
    <div className="grid grid-cols-7 gap-3 px-10 h-[230px]">
      {days
        ? days.map((value) => {
            return (
              <>
                <div
                  className="cursor-pointer w-fit"
                >
                  <div
                    className={
                      new Date(`${year}-${month}-${value.date}`).getTime() /
                        86400000 >=
                        new Date(
                          `${props?.startDate?.year}-${props?.startDate?.month}-${props?.startDate?.date}`
                        ).getTime() /
                          86400000 &&
                      new Date(`${year}-${month}-${value.date}`).getTime() /
                        86400000 <=
                        new Date(
                          `${props?.endDate?.year}-${props?.endDate?.month}-${props?.endDate?.date}`
                        ).getTime() /
                          86400000
                        ? "border-b-2 border-red-700 cursor-pointer"
                        : value.date < props?.startDate?.date &&
                          month <= props?.startDate?.month &&
                          year <= props?.startDate?.year
                        ? "text-gray-500 cursor-pointer"
                        : null
                    }
                    onClick={
                      (value.date < props?.startDate?.date &&
                      month <= props?.startDate?.month &&
                      year <= props?.startDate?.year ) && (props?.endDate?.endDate === null)? 
                          null
                        : 
                          value.date < now.date && month <= now.month && year <= now.year?
                            null
                          :
                            () => props.funct(value.date, month, year, days)
                    }
                  >
                    <div className={value.date < now.date && month <= now.month && year <= now.year? "text-sm text-center text-gray-200" : "text-sm text-center"}>
                    {value?.date}
                    </div>
                    <div className={value.date < now.date && month <= now.month && year <= now.year? "text-xs text-gray-200" : value?.discount? "text-xs text-green-500" : value?.markup? "text-xs text-red-500" : "text-xs"}>
                      {value?.discount? (props?.details?.[0]?.price - (props?.details?.[0]?.price * (value?.discount/100))).toString().slice(0, 3) : value?.markup? (props?.details?.[0]?.price + (props?.details?.[0].price * (value?.markup/100))).toString().slice(0, 3) : props?.details?.[0]?.price?.toString().slice(0, 3)  }
                    </div>
                  </div>
                </div>
              </>
            );
          })
        : null}
    </div>
    <div className="py-3">
      {/* 
        Button previous akan di disabled ketika user berada di bulan saat ini
      */}
      <button disabled={month === now.month && year === now.year? true : false} onClick={() => onCreateCalendar("-")} type="button" className={month === now.month && year === now.year? "py-1 px-2 mr-2 mb-2 text-xs font-xs text-gray-500 focus:outline-none bg-gray-300 rounded-full border bg-gray-300" : "py-1 px-2 mr-2 mb-2 text-xs font-xs text-black-900 focus:outline-none bg-white rounded-full border border-red-700 hover:bg-red-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-white-700 dark:focus:ring-white-700"}>
        Prev
      </button>
      <button onClick={() => onCreateCalendar("+")} type="button" className="py-1 px-2 mr-2 mb-2 text-xs font-xs text-black-900 focus:outline-none bg-white rounded-full border border-red-700 hover:bg-red-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-white-700 dark:focus:ring-white-700">
        Next
      </button>
    </div>
  </div>
</div>}
    </>
  );
}