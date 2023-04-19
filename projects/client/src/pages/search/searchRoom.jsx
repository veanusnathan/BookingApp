import { useEffect, useState } from "react";
import axios from "axios";
import { BsStarFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

function SearchRoom() {
  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const propertyName = searchParams.get("property_name");
  const priceMin = searchParams.get("price_min");
  const priceMax = searchParams.get("price_max");
  const sortOrder = searchParams.get("sort_order");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const location = searchParams.get("location");
  const searchData = searchParams.getAll("data");

  const isSearchPage =
    loc.pathname === "/search-result" &&
    propertyName &&
    priceMin &&
    priceMax &&
    sortOrder;

  const priceMinNumber = Number(priceMin);
  const priceMaxNumber = Number(priceMax);

  const formattedPriceMin = priceMinNumber.toLocaleString();
  const formattedPriceMax = priceMaxNumber.toLocaleString();

  const [room, setRoom] = useState([]);
  const [property, setProperty] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      if (propertyName && priceMin && priceMax && sortOrder) {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}properties/search-rooms?property_name=${propertyName}&price_min=${priceMin}&price_max=${priceMax}&sort_order=${sortOrder}`
        );
        setRoom(res.data.data);
      } else {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}properties/search-date?check_in=${startDate}&check_out=${endDate}&city=${location}&page=${currentPage}`
        );
        setProperty(response.data.data);
      }
    };
    getData();
  }, []);

  return (
    <>
      {room.length === 0 ? null : (
        <div className="flex justify-center items-center my-10">
          <div className="text-2xl capitalize">
            You Are Searching In Area {propertyName}, with price Range From Rp.{" "}
            {formattedPriceMin} - Rp. {formattedPriceMax}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center my-4 mx-10 ">
        {room &&
          room.map((room) => {
            console.log(room)
            return (
              <>
                <div className="flex items-center justify-between rounded-lg bg-white shadow-lg bg-transparent md:max-w-xl md:flex-row">
                  <div className="wrap">
                    {/* Title */}
                    <div className="flex mt-5 ml-5 text-white font-bold text-[22px] flex items-center gap-2">
                      <p className="text-[18px] text-black border-b-2 ">
                        {room?.property?.name}, {room.name}
                      </p>
                    </div>
                    <div className="flex justify-center my-4 ">
                      {/* Background */}
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${room?.room_images?.[0]?.image_path}`}
                        alt=""
                        className="object-cover sm:h-[17rem] md:h-[13rem] w-full px-5"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-end mr-5 pt-20">
                    <p className="mb-4 text-base text-black whitespace-nowrap text-xs md:text-lg">
                      Rp {room?.price?.toLocaleString()} - Night
                    </p>
                    <p className="text-xs md:text-lg text-black">
                      {room?.available_room} Available Room
                    </p>
                    <div className="flex items-center space-x-1 mt-2">
                      <BsStarFill className="my-rating" />
                      <p className="text-[15px] pr-5">{room?.rating ? room?.rating : 5}</p>
                    </div>
                    <Link to={`/room-details/${room.id}`} className="mt-2">
                      <button
                        type="button"
                        className="inline-block rounded-full border-2 my-bg-button-dark pt-2 pb-[6px]xs:text-xs md:text-sm px-2 md:px-6 py-2 font-semibold uppercase leading-normal text-white transition duration-150 ease-in-out hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 focus:border-success-600 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 whitespace-nowrap"
                        data-te-ripple-init
                      >
                        See the Room!
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            );
          })}
      </div>

      {property.length === 0 ? null : (
        <div className="flex px-5 md:px-0 text-justify justify-center items-center my-10">
          <div className="text-2xl capitalize font-semibold">
            You Are Searching property starting from {startDate} until {endDate}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 justify-center my-4 mx-10">
        {property &&
          property.map((value) => {
            return (
              <>
                <div className="flex items-center justify-evenly rounded-lg bg-white shadow-xl bg-transparent md:max-w-xl md:flex-row">
                  <div className="wrap">
                    {/* Title */}
                    <div className="flex mt-5 ml-5 text-white font-bold text-[22px] flex items-center gap-2">
                      <p className="text-[18px] text-black ">
                        {value?.property?.name}, {value?.name}
                      </p>
                    </div>
                    <div className="flex justify-center my-4 ">
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${value?.property?.property_images?.[0]?.image_path}`}
                        alt=""
                        className="object-cover sm:h-[17rem] md:h-[13rem] w-full px-5"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-end mr-5 pt-20">
                    <div className="mb-2 text-xl font-medium text-black ">
                      Start From
                    </div>
                    <p className="mb-4 text-base text-black whitespace-nowrap text-xs md:text-lg">
                      Rp {value?.property?.rooms?.[1]?.price?.toLocaleString()}{" "}
                      - Night
                    </p>
                    <p className="text-xs md:text-lg text-black">
                      {value?.property?.rooms?.length} Type Of Rooms
                    </p>
                    <div className="flex items-center space-x-1 mt-2">
                      <BsStarFill className="my-rating" />
                      <p className="text-[15px] pr-5">5.0</p>
                    </div>
                    <Link
                      to={`/details/${value?.property_id}`}
                      className="mt-2"
                    >
                      <button
                        type="button"
                        className="md:inline-block rounded-full border-2 my-bg-button-dark xs:text-xs md:text-sm px-2 md:px-6 pt-2 pb-[6px] py-2 mb-2 font-semibold uppercase leading-normal text-white transition duration-150 ease-in-out hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 focus:border-success-600 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 whitespace-nowrap"
                        data-te-ripple-init
                      >
                        See the Room!
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

export default SearchRoom;
