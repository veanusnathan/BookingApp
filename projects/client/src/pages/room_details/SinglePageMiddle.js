import React , { useEffect, useRef, useState} from 'react'
import "../../supports/styles/SinglePageMiddle.css"
import { useParams, Link } from 'react-router-dom'
import { FaStar, FaBath, FaShower,FaSmoking, FaSmokingBan } from "react-icons/fa"
import {GiHeatHaze, GiRobe} from "react-icons/gi"
import { BsPersonCircle , BsBoxSeamFill, BsWifi, BsStarFill} from "react-icons/bs"
import {MdRestaurantMenu, MdTv, MdBathtub, MdDry, MdDesk, MdCable} from "react-icons/md"
import {CgSmartHomeRefrigerator} from "react-icons/cg"
import {TbAirConditioning} from "react-icons/tb"
import axios from "axios"
import Review from 'components/review/review'
import TextArea from 'components/textarea/textarea'



const SinglePageMiddle = (props) => {
    const params = useParams();
    const { id } = params;
    const [accommodation, setAccommodation] = useState([])
    const [suggestion, setSuggestion] = useState([])
    const [exist, setExist] = useState(false)
    const city = props?.details?.[0]?.property?.locations?.[0]?.city_id

    useEffect(() => {
        roomConnector();
        checkBooking();
        propertySuggestion();
    }, [city])

    const roomConnector = async () => {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}properties/room-connector?room_id=${id}`
          );
          setAccommodation(res.data.data);
        } catch (error) {
          console.log(error);
        }
      };

      const checkBooking = async() => {
        try {
          const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}properties/check-booking`,
          {
            room_id: id
          },
          {
            headers: {
              auth: localStorage.getItem("token"),
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })

          if(res.data.data.length > 0){
            setExist(true)
          }
        } catch (error) {
          setExist(false)
          console.log(error)
        }
      }

      const propertySuggestion = async() => {
        try {
          if(city){
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}properties/suggestion?city=${city}`)
            setSuggestion(res.data.data)
          }
        } catch (error) {
          console.log(error)
        }
      }

      console.log(suggestion.length)

      const symbolReact = [
          <BsPersonCircle />,
          <MdRestaurantMenu />,
          <CgSmartHomeRefrigerator />,
          <TbAirConditioning />,
          <MdTv />,
          <FaBath />,
          <FaShower />,
          <GiHeatHaze />,
          <MdBathtub />,
          <MdDry />,
          <BsBoxSeamFill />,
          <GiRobe />,
          <MdDesk />,
          <BsWifi />,
          <MdCable />,
          <FaSmoking />,
          <FaSmokingBan />
      ]

      const mappedData = accommodation.map((data) => {
          const symbolIndex = data.id - 1;
          const symbol = symbolReact[symbolIndex]
          return {...data, symbol}
      })

    return (
      <>
        <div className='logo mt-10 md:mt-[-70px]'>
            <img src={`${process.env.REACT_APP_API_BASE_URL}Public/assets/logo.png`} className='w-36' />
        </div>
        <div className='border-b pb-5'>
          <div className='flex flex-col capitalize'>
            <div className="up text-xl font-semibold py-5">
              Benefits
            </div>
            <p className='text-justify'>Every booking includes free protection from Host cancellations,
                listing inaccuracies,{"\n"} 
                and other issues like trouble checking in.</p>
            <div className='text-xl font-semibold py-5'>
              Room Description
            </div>
            <div className='text-justify'>
            {props?.details?.[0]?.description}
            </div>
          </div>
        </div>

        {mappedData.length === 0 ? null : (
          <div className="my-8 border-b pb-10">
            <h2 className="text-2xl font-bold mb-2">
              Accommodation Available in this Room
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

      {props?.details?.length > 0 ?
      <>
        <div className='flex items-center pt-5 md:mt-5 '>
            <span className='pr-5 text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800' >Reviews</span>
            <span className='pr-2 font-semibold leading-7 lg:leading-9 text-xl lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-800 '>{props?.details?.[0]?.rating ? props?.details?.[0]?.rating : 5 }</span> 
            <FaStar className='my-rating' /> 
        </div>
        <div className=''>
            <Review className="" details={props?.details} />
        </div>
        <div className=''>
        {exist ? <TextArea details={props?.details}/> : null}
        </div>
      </>
      :
       null
       }

       <Carousel suggestion={suggestion} />
</>
)

}

export default SinglePageMiddle


const Carousel = ({suggestion}) => {
  const containerRef = useRef(null)
  const itemRef = useRef(null)
  const [defaultTransform, setDefaultTransform] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)

  const goNext = () => {
    const maxTransform = -(itemWidth * (suggestion?.length - 1))
    console.log(maxTransform)
    console.log(itemWidth)
    console.log(suggestion.length)
    if(defaultTransform > maxTransform){
      setDefaultTransform(defaultTransform - itemWidth)
    }
  }

  const goPrev = () => {
    if(defaultTransform < 0){
      setDefaultTransform(defaultTransform + itemWidth)
    }
  }

  useEffect(() =>{
    setItemWidth(itemRef?.current?.offsetWidth)
  }, [suggestion])


  return(
    <>
    <div className="text-2xl lg:text-3xl font-semibold leading-7 lg:leading-9 text-gray-80 border-t pt-8">
        Another Place Around Here
    </div>
    <div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4 mb-24">
        <div className="w-full relative flex items-center justify-center">
          <button
            onClick={() => goPrev()}
            aria-label="slide backward"
            className="absolute z-30 left-0 ml-10 hover:bg-slate-200 focus:outline-none focus:bg-slate-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
            id="prev"
          >
            <svg
              className="my-rating"
              width="14"
              height="28"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 1L1 7L7 13"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden" ref={containerRef}>
            <div
              id="slider"
              className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700"
              style={{ transform: `translateX(${defaultTransform}px)` }}
            >
              <div className="flex flex-shrink-0 relative w-auto h-full">
                {suggestion
                  ? suggestion.map((value, index) => {
                      return (
                        <Link to={`/details/${value?.id}`}>
                        <div className="flex justify-center mx-3 my-bg-light " ref={itemRef}>
                          <div className="max-w-sm">
                            <a
                              data-mdb-ripple="true"
                              data-mdb-ripple-color="light"
                            >
                              <img
                                src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${value?.property?.property_images?.[0]?.image_path}`}
                                alt={value?.property?.name}
                                className="object-cover object-center shadow-lg w-full rounded-lg bg-white h-[250px]"
                                key={index}
                              />
                            </a>
                            <div className="container flex text-center justify-between px-2">
                            <span className="text-lg text-left flex items-center font-semibold pt-2 ">{value.property.name}</span>
                            <div className="flex items-center space-x-1 pt-1">
                            <BsStarFill className="my-rating" />
                            {value ? (
                              <>
                                <p className="text-[15px] pt-0.5">
                                  {(value?.property?.rooms?.reduce((total, room) => total + room.rating, 0) / value.property.rooms.length) <= 3.5 ? 5 : value?.property?.rooms?.reduce((total, room) => total + room.rating, 0) / value.property.rooms.length}
                                </p>
                              </>
                            ) : null}
                          </div>
                            </div>
                            <p className="max-w-[17rem] text-[16px]-mt-1 mb-5 px-2">
                              <span className="text-gray-500">Start from </span>{" "}
                              <span className="font-black">
                                {" "}
                                Rp.{" "}
                                {value?.property?.rooms?.[1]?.price?.toLocaleString() <=
                                value?.property?.rooms?.[0]?.price?.toLocaleString()
                                  ? value?.property?.rooms?.[1]?.price?.toLocaleString()
                                  : value?.property?.rooms?.[0]?.price?.toLocaleString()}
                              </span>
                            </p>
                          </div>
                        </div>
                        </Link>
                      );
                    })
                  : "Loading"}
              </div>
            </div>
          </div>
          <button
            onClick={() => goNext()}
            aria-label="slide forward"
            className="absolute z-30 right-0 mr-10 hover:bg-slate-200 focus:outline-none focus:bg-slate-400 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
            id="next"
          >
            <svg
              className="my-rating"
              width="14"
              height="28"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L7 7L1 13"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}