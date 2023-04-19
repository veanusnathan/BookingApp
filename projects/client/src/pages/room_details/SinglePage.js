import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../supports/styles/SinglePage.css";
import { Link } from "react-router-dom";
import { FaKey } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { RiMedal2Fill } from "react-icons/ri";
import CalendarFunc from "./Calendar";
import SinglePageMiddle from "./SinglePageMiddle";
import "../../supports/styles/Tabs.css";
import axios from "axios";

const SinglePage = (props) => {
  const { details } = props;
  const [activeImg, setActiveImg] = useState(false);
  const defaultImg = details?.[0]?.room_images?.[0]?.image_path;
  const [defaultImage, setDefaultImage] = useState(defaultImg);
  const [isRates, setIsRates] = useState([]);
  const [value, setValue] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [days, setDays] = useState(0);
  const params = useParams();
  const { id } = params;

  let onSelectedDate = (discount, daysCheck, rates) => {
    console.log(daysCheck);
    setIsRates(rates);
    setDiscount(discount);
    setDays(daysCheck);
  };

  console.log(details);

  let onChange = (value) => {
    setValue(value);
  };
  const getImageSrcHandler = (e) => {
    setDefaultImage(e.target.src);
    setActiveImg(true);
  };

  const setDefaultImgHandler = () => {
    setDefaultImage(defaultImg);
    setActiveImg(false);
  };

  const [buttonOpen, setButtonOpen] = useState(false);
  const [buttonClose, setButtonClose] = useState(true);

  const buttonOpenHandler = (event) => {
    event.preventDefault();
    setButtonOpen(true);
    setButtonClose(false);
  };

  const buttonCloseHandler = (event) => {
    event.preventDefault();
    setButtonClose(false);
    setButtonOpen(false);
  };

  return (
    <>
        <div className="flex justify-center mb-3 ">
          <div className="wrapper flex justify-center items-center">
            {/* Carousel */}
            <section className="overflow-hidden text-neutral-700">
              {/* <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12"> */}
                <div className="-m-1 flex flex-wrap md:-m-2 pt-10 md:pt-0">
                  <div className="flex w-fit flex-wrap">
                    {activeImg ? (
                      <img
                        src={
                          defaultImage ||
                          `${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${defaultImage}`
                        }
                        className="single-page-main-pic cursor-pointer "
                      />
                    ) : (
                      <img
                        src={`${
                          process.env.REACT_APP_API_BASE_URL
                        }Public/PROPERTY/${defaultImg || { defaultImg }}`}
                        className="single-page-main-pic cursor-pointer "
                      />
                    )}

                    <div className="hidden w-fit xl:w-full sm:mx-6 md:mx-10 lg:mx-12 px-3 justify-center p-1 md:p-2 xl:grid xl:grid-cols-1 lg:single-page-main-pic-room xl:grid-cols-2 single-page-hold">
                      {details?.map((value) => {
                        {
                          return value.room_images.map((val) => {
                            return (
                              <div className="" key={val.id}>
                                <img
                                  src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${val.image_path}`}
                                  className="w-40 object-cover rounded-xl cursor-pointer single-page-pic "
                                  onMouseOver={getImageSrcHandler}
                                  onMouseLeave={setDefaultImgHandler}
                                />
                              </div>
                            );
                          });
                        }
                      })}
                    </div>
                  </div>
                </div>
              {/* </div> */}
            </section>
          </div>
        </div>

        {/* Property Owner */}
        <div className="border-b  grid grid-cols-1 px-4 py-6 mx-auto lg:py-3 sm:mt-[850px] md:mt-[800px] lg:mt-[800px] xl:mt-[600px]">
          <span className="text-2xl font-bold">
            Entire rental unit hosted by{" "}
            {details?.[0]?.property?.tenant?.first_name}{" "}
            {details?.[0]?.property?.tenant?.last_name}{" "}
          </span>
          <span className="text-xl">Max guests per room is 2. </span>
        </div>

        {/* Perks and Calendar */}
        <div className="xs:flex-col md:flex md:flex-row md:justify-between md:mx-auto md:px-4 md:mb-24 md:mt-5 border-b md:pb-10 text-justify">
          {/* left */}
          <div className="left">
            <div className="col1 flex mb-14">
              <RiMedal2Fill className="text-4xl md:text-3xl mt-2 my-rating" />
              <span className="flex-col capitalize pl-5">
                <span className="text-xl font-semibold ">
                  {details?.[0]?.property?.name} is a Superhost.{" "}
                </span>{" "}
                <p>
                  {" "}
                  highly rated hosts who are committed to providing great stays
                  for their guests.
                </p>
              </span>
            </div>
            <div className="col2 flex mb-14">
              <FaKey className="text-3xl mt-2" />
              <span className="flex-col capitalize pl-5">
                <p className="text-xl font-semibold">
                  Great check-in experience.{" "}
                </p>
                <p>
                  90% of recent guests gave the check-in process a 5-star
                  rating.
                </p>
              </span>
            </div>
            <div className="col3 flex mb-5">
              <FaCalendarCheck className="text-3xl my-main" />
              <span className="flex-col capitalize pl-5">
                <p className="text-xl font-semibold">
                  Free cancellation for 48 hours.{" "}
                </p>
                <p>No questions asked.</p>
              </span>
            </div>
          </div>
          {/* right */}
          <div className="right shadow-lg my-bg-light rounded-xl px-5 py-5">
            <div className="price font-semibold text-2xl w-full text-center mb-3">
              {" "}
              Rp. {details?.[0]?.price?.toLocaleString()} / Night{" "}
            </div>

            <div className="calendar-wrapper">
              <CalendarFunc
                placesId={id}
                details={details}
                onSelectedDate={onSelectedDate}
                placesPic={defaultImg}
                buttonopenState={buttonOpen}
                buttonCloseState={buttonClose}
                closeFunc={buttonCloseHandler}
                totalGuest={value}
              />

              <div className="guest-wrapper flex justify-between items-center">
                <p className="font-semibold text-lg">Total Guest</p>
                <div className="custom-number-input h-10 w-32">
                  <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                    <button
                      className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                      onClick={() => {
                        if (value > 1) {
                          setValue(value - 1);
                        }
                      }}
                    >
                      <span className="m-auto text-2xl font-thin">−</span>
                    </button>
                    <input
                      className="outline-none focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                      name="custom-input-number"
                      value={value}
                    />
                    <button
                      className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                      onClick={() => {
                        if (value < 4) {
                          setValue(value + 1);
                        }
                      }}
                    >
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center pt-14">
              <button
                className="rounded-full my-bg-main px-5 py-3 hover:scale-110 text-white font-semibold"
                onClick={buttonOpenHandler}
              >
                Pick A Date!
              </button>
              </div>

              <div className="mt-5 border-t">
              <p className="pl-5 md:pl-0 font-semibold text-xl pt-4">
                Total Calculated At Checkout
              </p>
              </div>
            </div>
          </div>
        </div>
        <SinglePageMiddle details={details} />
    </>
  );
};

export default SinglePage;
