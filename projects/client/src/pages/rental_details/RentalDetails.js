import React, { useEffect } from "react";
import { useState } from "react";
import {
  BsStarFill,
  BsPersonCircle,
  BsBoxSeamFill,
  BsWifi,
  BsBuildingFill,
} from "react-icons/bs";
import {
  MdLocationOn,
  MdOtherHouses,
  MdHotel,
  MdElevator,
  MdRestaurant,
  MdTableRestaurant,
  MdRestaurantMenu,
  MdSportsGymnastics,
  MdOutlineSpa,
  MdLocalLaundryService,
  MdOutlineAtm,
  MdStore,
} from "react-icons/md";
import { RxDimensions } from "react-icons/rx";
import { FaParking, FaSwimmer, FaSmoking } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { set } from "date-fns/esm";

const Rental = () => {
  const { id } = useParams();
  const [properties, setProperties] = useState([]);
  const [activeImg, setActiveImg] = useState(false);
  const [accommodation, setAccommodation] = useState([]);
  const defaultImg = properties?.property_images?.[0]?.image_path;
  const [defaultImage, setDefaultImage] = useState(defaultImg);

  useEffect(() => {
    onGetData();
    propertyConnector();
  }, []);

  const onGetData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}properties/details?property_id=${id}`
      );
      setProperties(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  const symbolReact = [
    <RxDimensions />,
    <BsPersonCircle />,
    <FaParking />,
    <MdElevator />,
    <MdRestaurant />,
    <MdTableRestaurant />,
    <MdRestaurantMenu />,
    <BsBoxSeamFill />,
    <BsWifi />,
    <BsBuildingFill />,
    <MdSportsGymnastics />,
    <FaSwimmer />,
    <MdOutlineSpa />,
    <MdLocalLaundryService />,
    <MdOutlineAtm />,
    <MdStore />,
    <FaSmoking />,
  ];

  const mappedData = accommodation.map((data) => {
    const symbolIndex = data?.id - 1;
    const symbol = symbolReact[symbolIndex];
    return { ...data, symbol };
  });

  console.log(mappedData);

  const propertyConnector = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}properties/property-connector?property_id=${id}`
      );
      setAccommodation(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getImageSrcHandler = (e) => {
    setDefaultImage(e.target.src);
    setActiveImg(true);
  };

  const setDefaultImgHandler = () => {
    setDefaultImage(defaultImg);
    setActiveImg(false);
  };

  return (
    <div className="">
      {/* title */}
      <div className="flex justify-center text-2xl md:text-3xl mt-5 h-10 px-3 md:px-0 whitespace-nowrap">
        {properties?.name || "Loading.."}
      </div>
      <div className="flex justify-center text-3xl mb-3 ">
        <div className="wrapper flex justify-center items-center">
          {/* Carousel */}
          <section className="overflow-hidden text-neutral-700">
            {/* <div className="container mx-auto px-5 py-2 lg:px-32"> */}
              <div className="-m-1 flex flex-wrap md:-m-2 px-5">
                <div className="flex w-fit flex-wrap">
                  {activeImg ? (
                    <img
                      src={
                        defaultImage ||
                        `${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${defaultImage}`
                      }
                      className="single-page-main-pic cursor-pointer"
                    />
                  ) : (
                    <img
                      src={`${
                        process.env.REACT_APP_API_BASE_URL
                      }Public/PROPERTY/${defaultImg || { defaultImg }}`}
                      className="single-page-main-pic cursor-pointer"
                    />
                  )}

                  <div className="hidden w-fit xl:w-full sm:mx-6 md:mx-10 lg:mx-12 px-3 justify-center p-1 md:p-2 xl:grid xl:grid-cols-1 lg:single-page-main-pic xl:grid-cols-2 single-page-hold">
                    {properties?.property_images?.map((value) => {
                      return (
                        <div className="" key={value.id}>
                          <img
                            src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${value?.image_path}`}
                            className="w-40 rounded-xl cursor-pointer single-page-pic"
                            onMouseOver={getImageSrcHandler}
                            onMouseLeave={setDefaultImgHandler}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            {/* </div> */}
          </section>
        </div>
      </div>

      {/* Description */}
      <div className=" px-4 py-6 mx-auto lg:py-12 sm:mt-[800px] md:mt-[700px] lg:mt-[650px] xl:mt-[500px]">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Property Descriptions</h2>
          <p className="text-gray-500 my-main">
            at {properties?.name || "Loading.."}
          </p>
        </div>
        <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-1">
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
            <div className="p-3 mr-4 bg-gray-100 rounded-full">
              <MdLocationOn className="my-main text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Address</h3>
              <p className="text-gray-500">
                {properties?.locations?.[0]?.name || "Loading.."}
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
            <div className="p-3 mr-4 bg-gray-100 rounded-full">
              <MdOtherHouses className="my-main text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold ">About</h3>
              <p className="text-gray-500 text-justify py-2">
                {properties?.description || "Loading.."}
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
            <div className="p-3 mr-4 bg-gray-100 rounded-full">
              <MdHotel className="my-main text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Available Room</h3>
              <p className="text-gray-500">
                {properties?.rooms?.length || "No Room Created yet"} Room Types available in
                this Property
              </p>
            </div>
          </div>
        </div>
        {mappedData.length === 0 ? null : (
          <div className="my-8">
            <h2 className="text-2xl font-bold mb-2">
              Accommodation Available in this Property
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {mappedData.map((value, index) => (
                <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
                  <div className="p-3 mr-4 bg-gray-100 rounded-full">
                    {value?.symbol}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{value?.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Property-rooms */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 justify-center my-4 mx-4 md:mx-20 mb-24">
        {properties?.rooms &&
          properties?.rooms?.map((room) => {
            return (
              <div className="flex items-center rounded-lg bg-white shadow-lg mx-2 md:mx-4 bg-transparent md:max-w-xl md:flex-row">
                <div className="flex justify-center my-4 md:my-0 md:mr-4">
                  {/* Background */}
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${room?.room_images?.[0]?.image_path}`}
                    alt=""
                    className="object-cover h-48 md:h-[13rem] w-full px-2 md:px-5"
                  />
                </div>

                <div className="flex flex-col justify-start p-2 md:p-6">
                  <h5 className="mb-1 md:mb-2 text-lg md:text-xl font-medium text-black">
                    {room?.name}
                  </h5>
                  <p className="mb-1 text-base text-black">Start From</p>
                  <p className="mb-2 md:mb-4 text-base text-black whitespace-nowrap text-xs md:text-md">
                    Rp {room?.price.toLocaleString()} - Night
                  </p>
                  <p className="text-xs text-black">
                    {room?.available_room} Rooms Available
                  </p>
                  <div className="flex items-center space-x-1 mt-1 md:mt-2">
                    <BsStarFill className="my-rating" />
                    <p className="text-[14px] md:text-[15px] pr-2 md:pr-5">
                      {room?.rating ?? 5}
                    </p>
                  </div>
                  <Link to={`/room-details/${room?.id}`} className="mt-2">
                    <button
                      type="button"
                      className="md:inline-block rounded-full border-2 my-bg-button-dark xs:text-xs md:text-sm px-2 md:px-6 pt-2 pb-[6px] mb-2 font-semibold uppercase leading-normal text-white transition duration-150 ease-in-out hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 focus:border-success-600 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 whitespace-nowrap"
                      data-te-ripple-init
                    >
                      See The Room!
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Rental;
