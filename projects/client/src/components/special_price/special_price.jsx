import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Loader from "components/loader/loader";
import Modal from "./../tenant/modal/modalTenant";
import TenantCalendars from "components/tenant/calendar/tenant_calendar";
import Date from "components/date/date";
import {BsFillArrowUpSquareFill, BsFillArrowDownSquareFill} from "react-icons/bs"
import BlockedDates from "./bloked_dates";

function SpecialPrice() {
  const location = useLocation();
  const data = location?.state;
  const id = data?.id;

  console.log(data)
  console.log(id)

  const [value, setValue] = useState(0);
  const [accommodation, setAccommodation] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const getTokenId = localStorage.getItem("tokenTid");

  const [form, setForm] = useState({
    eventName: "",
    start_date: "",
    end_date: "",
    discount: "",
    markup: "",
    discount_result: "",
    markup_result: "",
    total_rooms: ""
  });

  const [room, setRoom] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    onGetData();
    const discountResult = calculateDiscount();
    const markupResult = calculateMarkup();
    setForm({ ...form, discount_result: discountResult, markup_result: markupResult});
  }, [form?.discount, form?.markup]);

  const onGetData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}properties/room-details?room_id=${id}`
      );
      console.log(res);
      setDetails(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(form)


  const calculateDiscount = () => {
    const basePrice = details?.[0]?.price ?? 0;
    const discountPercentage = parseInt(form?.discount, 10) ?? 0;
    const discountAmount = (discountPercentage / 100) * basePrice;
    const discountedPrice = basePrice - discountAmount;
    return discountedPrice;
  };

  const calculateMarkup = () => {
    const basePrice = details?.[0]?.price ?? 0;
    const markupPercentage = parseInt(form?.markup, 10) ?? 0;
    const markupAmount = (markupPercentage / 100) * basePrice;
    const markedupPrice = basePrice + markupAmount;
    return markedupPrice;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let _form = {
      ...form,
      [name]: value,
    };

    if(name === "discount"){
      _form = {
        ...form,
        discount_result: calculateDiscount(value),
        [name]: value
      }
    }else if(name === "markup"){
      _form = {
        ...form,
        markup_result: calculateMarkup(value),
        [name]: value
      }
    }
    
    setForm(_form);
  };

  const editPrice = async () => {
    try {
      setLoading(true);
      if (form?.discount && form?.markup) throw { message: "Please Just choose discount or markup!" };
      if (!form?.start_date || !form.end_date)
        throw { message: "Please select date" };

      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}properties/room-price`,
        {
          name: form?.eventName,
          start_date: form?.start_date,
          end_date: form?.end_date,
          room_id: data?.id,
          discount: form?.discount,
          markup: form?.markup
        }
      );

      console.log(res)
      setRoom(res?.data?.data);
      setTimeout(() => {
        toast.success(res?.data?.message);
      }, 3500);

      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      setLoading(false);
      if (
        error.message === "Request failed with status code 400" ||
        error.message === "Request failed with status code 404"
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  if (!getTokenId) {
    navigate("/tenant-login");
  }

  return (
    <>
      <div className="relative my-bg-light md:pt-20 pb-32 mt-5 shadow-lg rounded-lg">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="w-full h-14 pt-2 text-center  bg-gray-700  shadow overflow-hidden sm:rounded-t-lg font-bold text-3xl text-white ">
            Setting Special Price
          </div>
          <div className="border rounded-b-lg border-gray-300 mx-auto">
            <div className="mt-10 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-2 py-2 bg-white sm:p-6">
                    <div className="w-full uppercase h-10 mt-8 text-center overflow-hidden sm:rounded-t-lg font-bold text-xl text-black ">
                      Room Details
                    </div>
                    <div className="col-span-10 sm:col-span-10">
                      <label
                        for="eventName"
                        className="block text-xl font-medium "
                      >
                        <span className="text-gray-700">Event Name</span>{" "}
                        <span className="text-slate-200">*Not required</span>
                      </label>
                      <input
                        type="text"
                        name="eventName"
                        value={form.eventName}
                        onChange={handleChange}
                        placeholder="eg. Eid"
                        id="eventName"
                        autocomplete="eventName"
                        className="py-4 px-4 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                      />
                    </div>


                    <div className="col-span-10 mt-6 sm:col-span-10">
                      <label
                        for="date"
                        className="block text-xl font-medium text-gray-700"
                      >
                        Now, set your date
                      </label>
                      <label
                        for="date"
                        className="block text-md font-medium text-gray-400 grid grid-cols-2"
                      >
                        <span>It can be just 1 day or 7 days in a row</span> 
                        <span className="mx-auto">Calendar Preview</span>
                        
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex flex-wrap justify-center items-center mb-4 h-full relative border rounded-lg shadow-md">
                        <div className="flex flex-col">
                          <span className="flex items-center justify-center leading-normal rounded rounded-md border border-r-1 font-regular text-gray-700 border-gray-300 px-4 whitespace-no-wrap text-md">
                            Start Date
                          </span>
                          <Date
                            className="flex-shrink flex-grow flex-auto leading-normal w-px border h-14 border-gray-300 px-3 relative"
                            onChange={handleChange}
                            // value={form.start_date}
                            name="start_date"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="flex items-center justify-center leading-normal rounded rounded-md border border-l-1 font-regular text-gray-700 border-gray-300 px-4 whitespace-no-wrap text-md">
                            End Date
                          </span>
                          <Date
                            className="flex-shrink flex-grow flex-auto leading-normal w-px border h-14 border-gray-300 px-3 relative"
                            onChange={handleChange}
                            value={form.end_date}
                            name="end_date"
                          />
                        </div>
                      </div>

                      <div className="right flex justify-center items-center">
                      <TenantCalendars
                        details={details}
                        startDate={startDate}
                        endDate={endDate}
                        // funct={onSelectedDate}
                      />
                      </div>
                      </div>

                      {/* percentage*/}
                      <div className="col-span-10 sm:col-span-10 mt-6">
                        <label
                          for="discount"
                          className="block text-xl font-medium text-gray-700"
                        >
                          Set Your desire percentage
                        </label>
                        <label
                          for="discount"
                          className="block text-md font-medium text-gray-400"
                        >
                          Choose only one
                        </label>
                        <div className="flex md:justify-center mt-3 pl-5 md:pl-0">
                          <div className="mr-[100px] md:mr-[350px]">
                            <label
                              for="discount"
                              className="block text-md font-medium text-gray-400"
                            >
                              Discount percentage
                            </label>
                          </div>
                          <div className="">
                            <label
                              for="markup"
                              className="block text-md font-medium text-gray-400 pr-10"
                            >
                              Markup percentage
                            </label>
                          </div>
                        </div>
                        <div className="flex">
                          <input
                            type="number"
                            name="discount"
                            placeholder="type your discount.."
                            id="discount"
                            autocomplete="discount"
                            className="py-10 px-4 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                            value={form.discount}
                            onChange={handleChange}
                          />
                          <input
                            type="number"
                            name="markup"
                            placeholder="type your markup.."
                            id="markup"
                            autocomplete="markup"
                            className="py-10 px-4 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                            value={form.markup}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Example result */}
                      <div className="col-span-10 sm:col-span-10 mt-6">
                        <label
                          for="result"
                          className="block text-xl font-medium text-gray-700"
                        >
                          See the Example Final Price
                        </label>
                        </div>
                          <section class="text-gray-600 body-font h-fit flex justify-center items-center mb-5">
                            <div class="container px-5 mx-auto">
                              <div class="flex flex-wrap -m-4 text-center">
                                <div class="p-4 sm:w-1/2 lg:w-1/2 w-full hover:scale-105 duration-500">
                                  <div class=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                                    <div>
                                      <h2 class="text-gray-900 text-lg text-left font-bold">
                                        Discount
                                      </h2>
                                      <h3 class="mt-2 text-xl font-bold text-yellow-500 text-left">
                                      Rp. {form?.discount_result ? form?.discount_result?.toLocaleString() : 0}
                                      </h3>
                                      <p class="text-sm text-left font-semibold text-gray-400">
                                        Base Price : Rp. {details?.[0]?.price?.toLocaleString()}
                                      </p>
                                    </div>
                                    <div class="bg-gradient-to-tr from-rose-600 to-rose-500 w-32 h-32  rounded-full shadow-2xl shadow-rose-500 border-white  border-dashed border-2  flex justify-center items-center ">
                                      <div>
                                        <h1 class="text-white text-4xl">
                                          <BsFillArrowDownSquareFill />
                                        </h1>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div class="p-4 sm:w-1/2 lg:w-1/2 w-full hover:scale-105 duration-500">
                                  <div class=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                                    <div>
                                      <h2 class="text-gray-900 text-lg text-left font-bold">
                                        Markup
                                      </h2>
                                      <h3 class="mt-2 text-xl font-bold text-yellow-500 text-left">
                                      Rp. {form?.markup_result ? form?.markup_result?.toLocaleString() : 0}
                                      </h3>
                                      <p class="text-sm text-left font-semibold text-gray-400">
                                        Base Price : Rp. {details?.[0]?.price?.toLocaleString()}
                                      </p>
                                    </div>
                                    <div class="bg-gradient-to-tr from-emerald-600 to-emerald-500 w-32 h-32  rounded-full shadow-2xl shadow-emerald-500 border-white  border-dashed border-2  flex justify-center items-center ">
                                      <div>
                                        <h1 class="text-white text-4xl">
                                          <BsFillArrowUpSquareFill />
                                        </h1>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                    </div>
                  </div>

                  <div className="mx-4 my-4 py-3 bg-white flex justify-end sm:px-6">
                    <div className="">
                      <button
                        type="button"
                        className="inline-block rounded bg-success px-10 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-success-600"
                        onClick={() => editPrice()}
                      >
                        {loading ? <Loader /> : "SAVE"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
      <BlockedDates />
    </>
  );
}

export default SpecialPrice;
