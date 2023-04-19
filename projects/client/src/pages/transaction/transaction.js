import React, { useEffect, useState } from "react";
import Bca from "../../supports/assets/bcavector.png";
import Bri from "../../supports/assets/bankbri.png";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "components/loader/loader";
import Modal from "./../../components/modal/modal";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import moment from 'moment';


const Transaction = () => {
  const [details, setDetails] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  // const [timer, setTimer] = useState(null)
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState(false);
  const [role, setRole] = useState("")
  const data = useParams();
  const location = useLocation()
  const users_id = location?.state;
  const navigate = useNavigate();
  const tenant = location.pathname === `/tenant-transaction/${data?.id}/${data?.order_id}`
  const user = location.pathname === `/transaction/${data?.id}/${data?.order_id}` || location.pathname ===`/transaction/${data?.id}/${data?.order_id1}/${data?.order_id2}`


  const startDate = details?.[0]?.check_in?.split("T")[0].split("-")[2]
  const endDate = details?.[0]?.check_out?.split("T")[0].split("-")[2]
  const checkIn = new Date(details?.[0]?.check_in?.split("T")[0])
  const checkOut = new Date (details?.[0]?.check_out?.split("T")[0])
  const format1 = new Date(checkIn)
  const newStartDate = format1.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  const format2 = new Date(checkOut)
  const newEndDate = format2.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  const oneDay = 1000 * 60 * 60 * 24; 

  const daysCheck = Math.ceil((checkOut?.getTime() -  checkIn?.getTime()) / 86400000);


  useEffect(() => {
    transaction();
    tenantTransaction();
    // paymentDue();
  }, []);

    const transaction = async () => {
    try {
      if (localStorage.getItem("token") && user) {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}transaction/data`,
          {
            room_id: data?.id,
            order_id1: data?.order_id || data?.order_id1,
            order_id2: data?.order_id2 || null,
          },
          {
            headers: {
              auth: localStorage.getItem("token"),
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        setRole(res?.data?.data?.[0]?.user?.role)
        setDetails(res?.data?.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  const tenantTransaction = async() => {
    try {
      if(localStorage.getItem("tokenTid") && tenant){
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}transaction/tenant-data`,
        {
          users_id,
          room_id: data?.id,
          order_id1: data?.order_id || data?.order_id1,
          order_id2: data?.order_id2 || null,
        })
        setDetails(res?.data?.data);
        console.log(res)
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  let onImagesValidation = (e) => {
    try {
      let files = [...e.target.files];
      if (files.length > 2) throw { message: "Select Just 1 Image" };

      files.forEach((value) => {
        if (value.size > 1000000)
          throw { message: `${value.name} more than 1Mb` };
      });

      setSelectedImages(files);
      toast.success("Upload success!");
    } catch (error) {
      if (
        error.message === "Request failed with status code 400" ||
        error.message === "Request failed with status code 404"
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };


  const uploadPayment = async () => {
    try {
      setLoading(true);
      let fd = new FormData();
      if (!selectedImages)
        throw { message: "Please Upload Your Payment Proof" };
      selectedImages.forEach((value) => {
        fd.append("images", value);
      });

      fd.append("room_id", data?.id);
      fd.append("order_id1", data?.order_id || data?.order_id1);
      fd.append("order_id2", data?.order_id2 || null);

      const res = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}transaction/payment-proof`,
        fd
      );

      if (res.status === 200) {
        setTimeout(() => {
          setPayment(true);
          toast.success(res.data.message);
        }, 3500);
      }

      setTimeout(() => {
        window.location.reload();
      }, 4000)
      
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


  const handleClick = (event) =>{
    const respond = event.target.value
    acceptPayment(respond);
  }

  const acceptPayment = async(respond) => {
    try {
      setLoading(true)
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}transaction/confirmation`,
      {
        users_id: details?.[0]?.users_id,
        room_id: data?.id,
        order_id1: data?.order_id || data?.order_id1,
        order_id2: data?.order_id2 || null,
        respond: respond,
        daysCheck
      })

      setTimeout(() => {
        toast.success(res.data.message)
        setPayment(true);
      }, 3500);

      setTimeout(() => {
        window.location.reload();
      }, 4000)


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
    }finally{
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }

  const isExpired = moment(details?.[0]?.expired).isBefore();

  // const paymentDue = () => {
  // if(details){
  //   const expired = new Date(details?.[0]?.expired)
  //   const countDown = expired.getTime();
  //   const intervalId = setInterval(() => {
  //     const now = new Date().getTime();
  //     const distance = countDown - now
  //     if(distance <= 0){
  //       clearInterval(intervalId)
  //       setTimer("Your time is up!");
  //     }else{
  //     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //     if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
  //       clearInterval(intervalId);
  //       setTimer("Your time is up!");
  //     }else if(details?.[0]?.status_id === 3){
  //       setTimer("Your Order has Been Canceled")
  //     }else if(details?.[0]?.status_id === 8){
  //       setTimer("Your Order has Been Rejected")
  //     }else if(details?.[0]?.status_id === 2){
  //       setTimer("Your Order has Been Paid")
  //     } else {
  //       setTimer(`${hours} hours, ${minutes} minutes, ${seconds} seconds`);
  //     }
  //     }
  //   }, 1000);
  // }
  // }

  return (
    <>
    {role === "user" ? 
    <>
    {user &&
    <>
    <div className=" px-10 md:px-32 pt-5">
        <div className="mb-2">
          <h1 className="text-xl md:text-4xl font-bold text-gray-600">
            Please Review Your Booking
          </h1>
          <h3 className="text-s md:text-xl border-b font-medium text-gray-600 pb-4">
           Please review your booking details before continuing to payment
          </h3>
        </div>
      </div>
      <div className="w-full mb-24 bg-white border-gray-200 text-gray-800">
        <div className="w-full md:px-44">
          <div className="md:flex items-start pt-10">
            <div className="px-3 md:w-7/12 lg:pr-10">
              {details?.length > 1 ? (
                // 2 order ID
                <>
                  <div className="w-full mx-2 md:mx-auto text-gray-800 font-light md:mb-6 border-b border-gray-200 md:pb-6">
                    <div className="pb-3">
                      <h7 className="font-extrabold uppercase text-xl">
                        Hotel & Room Details
                      </h7>
                    </div>
                    <div className="w-full mx-auto flex items-center rounded-lg p-3 bg-white border border-gray-200">
                      <div className="overflow-hidden rounded-md w-36 h-24 bg-gray-50 border border-gray-200">
                        <Link to={`/room-details/${details?.[0]?.room_id}`}>
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${details?.[0].room?.room_images?.[0]?.image_path}`}
                        />
                        </Link>
                      </div>
                      <div className="flex-grow pl-3">
                        <h7 className="font-bold uppercase">
                          {details?.[0].room?.property?.name}
                        </h7>
                        <div>
                          <h7 className="font-bold uppercase">
                            {details?.[0].room?.name}
                          </h7>
                        </div>
                        <p className="text-gray-500 font-medium">
                          {daysCheck}x{" "}
                        </p>
                        <p className="text-gray-500 font-medium">Night </p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">
                          Rp
                        </span>{" "}
                        <span className="font-semibold text-md">
                          {details?.[1].room?.price?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                    <div className="pb-3"></div>
                    <div className="w-full mx-auto flex items-center rounded-lg p-3 bg-white border border-gray-200">
                      <div className="overflow-hidden rounded-md w-36 h-24 bg-gray-50 border border-gray-200">
                      <Link to={`/room-details/${details?.[0]?.room_id}`}>
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${details?.[1].room?.room_images?.[0]?.image_path}`}
                        />
                        </Link>
                      </div>
                      <div className="flex-grow pl-3">
                        <h7 className="font-bold uppercase">
                          {details?.[1].room?.property?.name}
                        </h7>
                        <div>
                          <h7 className="font-bold uppercase">
                            {details?.[1].room?.name}
                          </h7>
                        </div>
                        <p className="text-gray-500 font-medium">
                          {daysCheck}x{" "}
                        </p>
                        <p className="text-gray-500 font-medium">Night </p>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-200 text-sm whitespace-nowrap">
                          *Normal Price
                        </span>{" "}
                        <div className="flex justify-center items-center">
                        <span className="font-semibold text-gray-400 text-sm">
                          Rp
                        </span>{" "}
                        <span className="font-semibold text-md">
                          {details?.[1]?.room?.price?.toLocaleString()}
                        </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // 1 order ID
                <>
                  <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                    <div className="pb-3">
                      <h7 className="font-extrabold uppercase text-xl">
                        Hotel & Room Details
                      </h7>
                    </div>
                    <div className="w-full mx-auto flex items-center rounded-lg p-3 bg-white border border-gray-200">
                      <div className="overflow-hidden rounded-md w-36 h-24 bg-gray-50 border border-gray-200">
                      <Link to={`/room-details/${details?.[0]?.room_id}`}>
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${details?.[0]?.room?.room_images?.[0]?.image_path}`}
                        />
                        </Link>
                      </div>
                      <div className="flex-grow pl-3">
                        <h7 className="font-bold uppercase">
                          {details?.[0]?.room?.property?.name}
                        </h7>
                        <div>
                          <h7 className="font-bold uppercase">
                            {details?.[0]?.room?.name}
                          </h7>
                        </div>
                        <p className="text-gray-500 font-medium">{daysCheck}x{" "} </p>
                        <p className="text-gray-500 font-medium">Night </p>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-200 text-sm whitespace-nowrap">
                          *Normal Price
                        </span>{" "}
                        <div className="flex justify-center items-center">
                        <span className="font-semibold text-gray-400 text-sm">
                          Rp
                        </span>{" "}
                        <span className="font-semibold text-md">
                          {details?.[0]?.room?.price?.toLocaleString()}
                        </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="w-full mx-auto rounded-lg bg-gray-100 border text-gray-800  font-light mb-6 border-b border-gray-200 pb-6 p-3 ">
                <div className="w-full border-gray-200">
                  <div className="pb-3">
                    <h7 className="font-extrabold uppercase text-xl">
                      User Details
                    </h7>
                    <Modal data={data} />
                  </div>
                  <div className="w-full mx-auto flex-grow items-center rounded-lg p-3 bg-white border border-gray-200">
                    <div className="w-full justify-between flex mb-3 items-center">
                      <div className="flex">
                        <span className="text-gray-600">Username </span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold capitalize">
                          {details?.[0]?.user?.first_name}{" "}
                          {details?.[0]?.user?.last_name}
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex justify-between mb-3 items-center">
                      <div className="flex">
                        <span className="text-gray-600">User Contact</span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold">
                          +62{details?.[0]?.user?.phone_number}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full justify-between items-center rounded-lg p-3 mb-6 bg-white border border-gray-200">
                <div className="mb-6 mt-6 border-gray-200 text-gray-800">
                  <div className="w-full flex items-center">
                    <div className="w-full flex justify-between pl-4 rounded-lg">
                      <span className="text-gray-600 font-semibold text-md">
                        Add Coupon
                      </span>
                    </div>
                    <div className="-mx-2 flex items-end justify-end">
                      <div className="flex-grow lg:max-w-xs">
                        <div>
                          <input
                            className="w-full px-10 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#c9403e] transition-colors"
                            placeholder="********"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="px-2">
                        <button className="block w-full max-w-xs mx-auto border border-transparent bg-[#c9403e] hover:bg-[#e58786] focus:bg-green-600 text-white rounded-md px-5 py-2 font-semibold">
                          APPLY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prcicing Details */}
              <div className="w-full mx-auto rounded-lg bg-gray-100 border text-gray-800  font-light mb-6 border-gray-200 pb-6 p-3 ">
                <div className="w-full border-gray-200">
                  <div className="pb-3">
                    <h7 className="font-extrabold uppercase text-xl">
                      Pricing Details
                    </h7>
                  </div>
                  <div className="w-full mx-auto flex-grow items-center rounded-lg p-3 bg-white border border-gray-200">
                    <div className="w-full justify-between flex mb-3 items-center">
                      <div className="flex-grow">
                        <span className="text-gray-600">Subtotal </span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold text-gray-400 text-sm">
                          {daysCheck} Nights x Rp
                        </span>{" "}
                        <span className="font-semibold">
                          {details?.[0]?.room?.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex justify-between mb-3 items-center">
                      <div className="flex">
                        <span className="text-gray-600">Total Room</span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold">{details?.length}</span>
                      </div>
                    </div>
                    <div className="w-full flex justify-between mb-3 border-b pb-3 items-center">
                      <div className="flex">
                        <span className="text-gray-600">Taxes</span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold">10%</span>
                      </div>
                    </div>
                    <div className="w-full flex border-gray-200 md:border-none text-gray-800 text-xl">
                      <div className="w-full flex items-center">
                        <div className="flex-grow">
                          <span className="text-gray-600">Total Price</span>
                        </div>
                        <div className="pl-3">
                          <span className="text-slate-300 text-xs pr-1">Calculated after event etc.</span>
                          <span className="font-semibold text-gray-400 text-sm">
                            Rp
                          </span>{" "}
                          <span className="font-semibold">
                            {`${(
                              details?.[0]?.total_price * details?.length +
                              details?.[0]?.total_price * details?.length * 0.1
                            ).toLocaleString()}`}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 md:w-5/12">
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                <div className="pb-3">
                  {details?.[0]?.status_id === 4 ? null : 
                  <div className="font-extrabold uppercase text-xl">
                  Order Details
                </div>}
                  
                  {details?.[0]?.status_id === 4 && (
                    <>
                      <div className="pb-3 flex justify-evenly">
                        <div className="font-extrabold uppercase text-xl">
                          Order Details
                        </div>
                        <button
                          className="block max-w-xs mx-auto border border-transparent bg-[#c9403e] hover:bg-[#e58786]  text-white rounded-md px-5 py-2 font-semibold"
                          data-te-toggle="modal"
                          data-te-target="#cancelOrder"
                        >
                          Cancel Order
                        </button>
                      </div>
                    </>
                  )}
                </div>
                <div className="w-full flex mb-3 items-center">
                  <div className="w-32">
                    <span className="text-gray-600 font-medium">No. Order</span>
                  </div>
                  <div className="flex-grow font-bold">
                    {details?.length > 1 ? (
                      <div className="flex truncate">
                        <p>{details?.[0]?.order_id} &</p>
                        <p className="pl-1">{details?.[1]?.order_id}</p>
                      </div>
                    ) : (
                      details?.[0]?.order_id
                    )}
                  </div>
                </div>
                <div className="w-full flex mb-3 items-center">
                  <div className="w-32">
                    <span className="text-gray-600 font-medium">Check-in</span>
                  </div>
                  <div className="flex-grow font-bold">
                    <span>{newStartDate ? newStartDate : null }</span>
                  </div>
                  <div className="w-32">
                    <span className="text-gray-600 font-medium pl-6">From</span>
                  </div>
                  <div className="flex-grow font-bold pl-6">
                    <span>14:00 WIB</span>
                  </div>
                </div>
                <div className="w-full flex mb-3 items-center">
                  <div className="w-32">
                    <span className="text-gray-600 font-medium">Check-out</span>
                  </div>
                  <div className="flex-grow font-bold">
                    <span>{newEndDate ? newEndDate : null}</span>
                  </div>
                  <div className="w-32">
                    <span className="text-gray-600 font-medium pl-5">
                      Before
                    </span>
                  </div>
                  <div className="flex-grow font-bold pl-6">
                    <span>12:00 WIB</span>
                  </div>
                </div>
                <div className="w-full flex mb-3 items-center">
                  <div className="w-32">
                    <span className="text-gray-600 font-medium">Status</span>
                  </div>
                  {details?.[0]?.status_id === 4 && (
                    <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-50 rounded-full bg-yellow-200"
                      ></span>
                      <span className="relative">Waiting Payment</span>
                    </span>
                  )}
                  {details?.[0]?.status_id === 2 && (
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-50 rounded-full bg-green-200"
                      ></span>
                      <span className="relative">Paid</span>
                    </span>
                  )}
                  {details?.[0]?.status_id === 3 && (
                    <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-50 rounded-full bg-red-200"
                      ></span>
                      <span className="relative">Cancel</span>
                    </span>
                  )}
                  {details?.[0]?.status_id === 8 && (
                    <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-50 rounded-full bg-red-200"
                      ></span>
                      <span className="relative">Rejected</span>
                    </span>
                  )}
                  {details?.[0]?.status_id === 7 && (
                    <span className="relative inline-block px-3 py-1 font-semibold text-purple-900 leading-tight">
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-50 rounded-full bg-purple-200"
                      ></span>
                      <span className="relative">Waiting Approval</span>
                    </span>
                  )}
                </div>
                <div className="w-full flex mb-3 items-center">
                <div className="w-32">
                    <span className="text-gray-600 font-medium">Due Time</span>
                </div>
                <div className="flex-grow font-bold">
                {isExpired ? (
                  <span>Your Time is Up</span>
                ) : (
                  <span>
                    <Moment
                      date={details?.[0]?.expired}
                      durationFromNow
                      interval={1000}
                    />
                  </span>
                )}
              </div>
              </div>
              </div>
              <div className="w-full mx-auto rounded-lg bg-gray-100 border border-gray-200 text-gray-800 font-light mb-6">
                  {details?.[0]?.image_path &&
                  <div className="w-full mx-auto rounded-lg bg-gray-100 border border-gray-200 text-gray-800 font-light mb-6">
                  <div className="w-full p-3 border-gray-200">
                    <div className="pb-3">
                      <div className="font-extrabold uppercase text-xl">
                        Payment Proof
                      </div>
                    </div>
                    <div class="px-6 py-12 md:px-12 text-gray-800 text-center lg:text-left">
                        <img src={`${process.env.REACT_APP_API_BASE_URL}${details?.[0]?.image_path}`} alt=""
                        className="w-full rounded-lg shadow-lg" />
                  </div>
                  </div>
                </div>}
              
                {details?.[0]?.image_path === null ? <div className="w-full p-3 border-gray-200">
                  <div className="pb-3">
                    <h7 className="font-extrabold uppercase text-xl">
                      Select Destination Account
                    </h7>
                  </div>
                  <div className="w-full p-3">
                    <label
                      for="type2"
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-indigo-500"
                        name="type"
                        id="type2"
                      />
                      <img src={Bca} width="80" className="ml-3" />
                    </label>
                  </div>
                  <div className="grid">
                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                      Bank Central Asia
                    </label>
                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                      A/N PT. VCATION INDONESIA KREASI BANGSA
                    </label>
                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                      4971485218
                    </label>
                  </div>
                  <div className="w-full p-3">
                    <label
                      for="type2"
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-indigo-500"
                        name="type"
                        id="type2"
                      />
                      <img src={Bri} width="80" className="ml-3" />
                    </label>
                  </div>
                  <div className="grid">
                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                      Bank Rakyat Indonesia
                    </label>
                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                      A/N PT. VCATION INDONESIA KREASI BANGSA
                    </label>
                    <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                      039601000914569
                    </label>
                  </div>
                  <div>
                    <div className="pt-4">
                      <h7 className="font-bold text-s">Upload Payment Proof</h7>
                    </div>
                    <input
                      className="w-full px-3 py-2 mb-1 border bg-white border-gray-200 rounded-lg focus:outline-none focus:border-[#c9403e] transition-colors"
                      type="file"
                      id="formFile"
                      accept="image/*"
                      onChange={(e) => onImagesValidation(e)}
                    />
                    <label className="text-gray-600 font-normal text-sm mb-2 ml-1">
                      * Multiple file max 1MB (.jpg or .png only)
                    </label>
                  </div>
                </div> : null }
              </div>
              {isExpired ? null : 
              <div>
              {details?.[0]?.status_id === 4 &&  
                <button
                  className="block w-full max-w-xs mx-auto bg-[#c9403e] hover:bg-[#e58786] focus:bg-green-600 text-white rounded-lg px-3 py-2 font-semibold"
                  onClick={() => uploadPayment()}
                  disabled={payment}
                >
                  <i className="mdi mdi-lock-outline mr-1"></i>{" "}
                   {(loading ? <Loader /> : payment ? "PAID" : "PAY NOW")}
                  
                </button>
                }

                {details?.[0]?.status_id ===  2 && 
                <button
                className="block w-full max-w-xs mx-auto bg-[#c9403e] hover:bg-[#e58786] focus:bg-green-600 text-white rounded-lg px-3 py-2 font-semibold"
                disabled
              >
                <i className="mdi mdi-lock-outline mr-1"></i>{" "}
                 PAID
              </button>}
              </div>}
            </div>
          </div>
        </div>
      </div>
    </>
    }
    </>
    : null}





    {/* Tenant */}
    {tenant ? 
    <>
    {tenant &&
    <>
    <div className="px-10 md:px-32 pt-5">
        <div className="mb-2">
          <h1 className="text-xl md:text-4xl font-bold text-gray-600">
            Please Review Users Booking
          </h1>
          <h3 className="text-s md:text-xl border-b font-medium text-gray-600 pb-4">
            Please review users booking details before continuing to accept the payment
          </h3>
        </div>
      </div>
      <div className="w-full mb-24 bg-white border-gray-200 text-gray-800">
        <div className="w-full md:px-44">
          <div className="md:flex items-start pt-10">
            <div className="px-3 md:w-7/12 lg:pr-10">
                  <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                    <div className="pb-3">
                      <h7 className="font-extrabold uppercase text-xl">
                        Hotel & Room Details
                      </h7>
                    </div>
                    <div className="w-full mx-auto flex items-center rounded-lg p-3 bg-white border border-gray-200">
                      <div className="overflow-hidden rounded-md w-36 h-24 bg-gray-50 border border-gray-200">
                      <Link to={`/room-details/${details?.[0]?.room_id}`}>
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${details?.[0]?.room?.room_images?.[0]?.image_path}`}
                        />
                      </Link>
                      </div>
                      <div className="flex-grow pl-3">
                        <h7 className="font-bold uppercase">
                          {details?.[0]?.room?.property?.name}
                        </h7>
                        <div>
                          <h7 className="font-bold uppercase">
                            {details?.[0]?.room?.name}
                          </h7>
                        </div>
                        <p className="text-gray-500 font-medium">1x </p>
                        <p className="text-gray-500 font-medium">Night </p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-400 text-sm">
                          Rp
                        </span>{" "}
                        <span className="font-semibold text-md">
                          {details?.[0]?.room?.price?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

              <div className="w-full mx-auto rounded-lg bg-gray-100 border text-gray-800  font-light mb-6 border-b border-gray-200 pb-6 p-3 ">
                <div className="w-full border-gray-200">
                  <div className="pb-3">
                    <h7 className="font-extrabold uppercase text-xl">
                      User Details
                    </h7>
                    <Modal data={data} />
                  </div>
                  <div className="w-full mx-auto flex-grow items-center rounded-lg p-3 bg-white border border-gray-200">
                    <div className="w-full justify-between flex mb-3 items-center">
                      <div className="flex">
                        <span className="text-gray-600">Username </span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold capitalize">
                          {details?.[0]?.user?.first_name}{" "}
                          {details?.[0]?.user?.last_name}
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex justify-between mb-3 items-center">
                      <div className="flex">
                        <span className="text-gray-600">User Contact</span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold">
                          +62{details?.[0]?.user?.phone_number}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="w-full justify-between items-center rounded-lg p-3 mb-6 bg-white border border-gray-200">
                <div className="mb-6 mt-6 border-gray-200 text-gray-800">
                  <div className="w-full flex items-center">
                    <div className="w-full flex justify-between pl-4 rounded-lg">
                      <span className="text-gray-600 font-semibold text-md">
                        Add Coupon
                      </span>
                    </div>
                    <div className="-mx-2 flex items-end justify-end">
                      <div className="flex-grow lg:max-w-xs">
                        <div>
                          <input
                            className="w-full px-10 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#c9403e] transition-colors"
                            placeholder="********"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="px-2">
                        <button className="block w-full max-w-xs mx-auto border border-transparent bg-[#c9403e] hover:bg-[#e58786] focus:bg-green-600 text-white rounded-md px-5 py-2 font-semibold">
                          APPLY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Prcicing Details */}
              <div className="w-full mx-auto rounded-lg bg-gray-100 border text-gray-800  font-light mb-6 border-gray-200 pb-6 p-3 ">
                <div className="w-full border-gray-200">
                  <div className="pb-3">
                    <h7 className="font-extrabold uppercase text-xl">
                      Pricing Details
                    </h7>
                  </div>
                  <div className="w-full mx-auto flex-grow items-center rounded-lg p-3 bg-white border border-gray-200">
                    <div className="w-full justify-between flex mb-3 items-center">
                      <div className="flex-grow">
                        <span className="text-gray-600">Subtotal </span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold text-gray-400 text-sm">
                          {daysCheck} Nights x Rp
                        </span>{" "}
                        <span className="font-semibold">
                          {details?.[0]?.room?.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex justify-between mb-3 items-center">
                      <div className="flex">
                        <span className="text-gray-600">Total Room</span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold">{details?.length}</span>
                      </div>
                    </div>
                    <div className="w-full flex justify-between mb-3 border-b pb-3 items-center">
                      <div className="flex">
                        <span className="text-gray-600">Taxes</span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold">10%</span>
                      </div>
                    </div>
                    <div className="w-full flex border-gray-200 md:border-none text-gray-800 text-xl">
                      <div className="w-full flex items-center">
                        <div className="flex-grow">
                          <span className="text-gray-600">Total Price</span>
                        </div>
                        <div className="pl-3">
                          <span className="text-slate-300">after discount event etc.</span>
                          <span className="font-semibold text-gray-400 text-sm">
                            Rp
                          </span>{" "}
                          <span className="font-semibold">
                            {`${(
                              details?.[0]?.total_price * details?.length +
                              details?.[0]?.total_price * details?.length * 0.1
                            ).toLocaleString()}`}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 md:w-5/12">
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                <div className="pb-3">
                  {details?.[0]?.status_id === 4 ? null : 
                  <div className="font-extrabold uppercase text-xl">
                  Order Details
                </div>}
                  
                  {details?.[0]?.status_id === 4 && (
                    <>
                      <div className="pb-3 flex justify-evenly">
                        <div className="font-extrabold uppercase text-xl">
                          Order Details
                        </div>
                        {/* <button
                          className="block max-w-xs mx-auto border border-transparent bg-[#c9403e] hover:bg-[#e58786]  text-white rounded-md px-5 py-2 font-semibold"
                          data-te-toggle="modal"
                          data-te-target="#cancelOrder"
                        >
                          Cancel Order
                        </button> */}
                      </div>
                    </>
                  )}
                </div>
                <div className="w-full flex mb-3 items-center">
                  <div className="w-32">
                    <span className="text-gray-600 font-medium">No. Order</span>
                  </div>
                  <div className="flex-grow font-bold">
                    {details?.length > 1 ? (
                      <div className="flex truncate">
                        <p>{details?.[0]?.order_id} &</p>
                        <p className="pl-1">{details?.[1]?.order_id}</p>
                      </div>
                    ) : (
                      details?.[0]?.order_id
                    )}
                  </div>
                </div>
                <div className="w-full flex mb-3 items-center">
                  <div className="w-32">
                    <span className="text-gray-600 font-medium">Check-in</span>
                  </div>
                  <div className="flex-grow font-bold">
                    <span>{newStartDate ? newStartDate : null }</span>
                  </div>
                  <div className="w-32">
                    <span className="text-gray-600 font-medium pl-6">From</span>
                  </div>
                  <div className="flex-grow font-bold pl-6">
                    <span>14:00 WIB</span>
                  </div>
                </div>
                <div className="w-full flex mb-3 items-center">
                  <div className="w-32">
                    <span className="text-gray-600 font-medium">Check-out</span>
                  </div>
                  <div className="flex-grow font-bold">
                    <span>{newEndDate ? newEndDate : null}</span>
                  </div>
                  <div className="w-32">
                    <span className="text-gray-600 font-medium pl-5">
                      Before
                    </span>
                  </div>
                  <div className="flex-grow font-bold pl-6">
                    <span>12:00 WIB</span>
                  </div>
                </div>
                <div className="w-full flex mb-3 items-center">
                  <div className="w-32">
                    <span className="text-gray-600 font-medium">Status</span>
                  </div>
                  {details?.[0]?.status_id === 4 && (
                    <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-50 rounded-full bg-yellow-200"
                      ></span>
                      <span className="relative">Waiting Payment</span>
                    </span>
                  )}
                  {details?.[0]?.status_id === 2 && (
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-50 rounded-full bg-green-200"
                      ></span>
                      <span className="relative">Paid</span>
                    </span>
                  )}
                  {details?.[0]?.status_id === 3 && (
                    <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-50 rounded-full bg-red-200"
                      ></span>
                      <span className="relative">Cancel</span>
                    </span>
                  )}
                  {details?.[0]?.status_id === 8 && (
                    <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-50 rounded-full bg-red-200"
                      ></span>
                      <span className="relative">Rejected</span>
                    </span>
                  )}
                  {details?.[0]?.status_id === 7 && (
                    <span className="relative inline-block px-3 py-1 font-semibold text-purple-900 leading-tight">
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-50 rounded-full bg-purple-200"
                      ></span>
                      <span className="relative">Waiting Approval</span>
                    </span>
                  )}
                </div>
                <div className="w-full flex mb-3 items-center">
                <div className="w-32">
                    <span className="text-gray-600 font-medium">Due Time</span>
                </div>
                <div className="flex-grow font-bold">
                {isExpired ? (
                  <span>Your Time is Up</span>
                ) : (
                  <span>
                    <Moment
                      date={details?.[0]?.expired}
                      durationFromNow
                      interval={1000}
                    />
                  </span>
                )}
              </div>
                </div>
              </div>
              <div className="w-full mx-auto rounded-lg bg-gray-100 border border-gray-200 text-gray-800 font-light mb-6">
                <div className="w-full p-3 border-gray-200">
                  <div className="pb-3">
                    <div className="font-extrabold uppercase text-xl">
                      Payment Proof
                    </div>
                  </div>
                  <div class="px-6 py-12 md:px-12 text-gray-800 text-center lg:text-left">
                      <img src={`${process.env.REACT_APP_API_BASE_URL}${details?.[0]?.image_path}`} alt=""
                      className="w-full rounded-lg shadow-lg" />
                </div>
                </div>
              </div>
              <div className="flex justify-evenly">
              {details?.[0]?.status_id === 2 || details?.[0]?.status_id === 3 || details?.[0]?.status_id === 4 || details?.[0]?.status_id === 8 ? null :
              <>
                <button
                  className="block w-full max-w-xs mx-auto bg-[#c9403e] hover:bg-[#c9403e] focus:bg-rose-700 text-white rounded-lg px-3 py-2 font-semibold"
                  onClick={handleClick}
                  value={"Reject"}
                  name="Reject"
                  disabled={payment}
                >
                  <i className="mdi mdi-lock-outline mr-1"></i>{" "}
                    {loading ? <Loader/> : "Reject" }
                  
                </button>
                <button
                  className="block w-full max-w-xs mx-auto my-bg-button-dark hover:bg-emerald-700 focus:bg-green-600 text-white rounded-lg px-3 py-2 font-semibold ml-5"
                  onClick={handleClick}
                  value={"Accept"}
                  name="Accept"
                  disabled={payment}
                >
                  <i className="mdi mdi-lock-outline mr-1"></i>{" "}
                    {loading ? <Loader /> : "Accept"}
                  
                </button>
                </>
}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    }
    </>
    : null}
      <Toaster />
    </>
  );
};

export default Transaction;
