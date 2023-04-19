import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios"
import Loader from "components/loader/loader";


function CreateRoom() {
  const location = useLocation();
  const property_id = location?.state;
  const [value, setValue] = useState(0)
  const [accommodation, setAccommodation] = useState([])
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState([])
  const navigate = useNavigate();
  const getTokenId = localStorage.getItem("tokenTid");

  const [form, setForm] = useState({
    name: "",
    description: "",
    room: "",
    accommodation: [],
    price: "",
    property_id: property_id,
  });

  console.log(form)

  const createRoom = async() => {
    try {
      setLoading(true)
      let fd = new FormData();
      if (!selectedImages) throw { message: "please Upload Your Image" };
      selectedImages.forEach((value) => {
        fd.append("PROPERTY", value);
      });
  
      fd.append('name', form?.name)
      fd.append('description', form?.description)
      fd.append('available_room', form?.room)
      fd.append('room_accommodation', form?.accommodation)
      fd.append('price', form?.price)
      fd.append('property_id', form?.property_id)
  
      
  
        const room = await axios.post(`${process.env.REACT_APP_API_BASE_URL}properties/create-room`, fd ,
        {
          headers: {
            auth: getTokenId,
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        })
  
        setRoom(room?.data?.data)
        setTimeout(() => {
          toast.success(room?.data?.message)
        }, 4500);

        setTimeout(() => {
          navigate('/dashboard-propertylist')
        }, 4500);
  
    } catch (error) {
      setLoading(false)
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
      }, 5000);
    }
  }
  
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    let _form = { ...form };
    if (type === "checkbox") {
      if (checked) {
        _form[name] = [..._form[name], value];
      } else {
        _form[name] = _form[name].filter((item) => item !== value);
      }
    } else {
      _form[name] = value;
    }
    setForm(_form);
  };

  const handleClick = (newValue) => {
    setValue(newValue);
    setForm({ ...form, room: newValue });
  };

  let getRoomAccommodation = async() => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}properties/room-accommodation`)
      setAccommodation(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  let onImagesValidation = (e) => {
    try {
      let files = [...e.target.files];

      if (files.length < 4) throw { message: "Select 4 Image!" };

      files.forEach((value) => {
        if (value.size > 2000000)
          throw { message: `${value.name} more than 2Mb` };
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

  useEffect(() => {
    getRoomAccommodation();
  }, [])



  return (
    <>
      <div className="relative my-bg-light md:pt-20 pb-32 mt-5 shadow-lg rounded-lg">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="w-full h-14 pt-2 text-center  bg-gray-700  shadow overflow-hidden sm:rounded-t-lg font-bold text-3xl text-white ">
            Create a new room
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
                        for="name"
                        className="block text-xl font-medium text-gray-700"
                      >
                        Give a title to the room in your property
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="type your room title.."
                        id="name"
                        autocomplete="roomName"
                        className="py-4 px-4 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-10 mt-6 sm:col-span-10">
                      <label
                        for="price"
                        className="block text-xl font-medium text-gray-700"
                      >
                        Now, set your price
                      </label>
                      <label
                        for="price"
                        className="block text-md font-medium text-gray-400"
                      >
                        You can change it anytime.
                      </label>
                      <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                        <div className="flex -mr-px">
                          <span className="flex items-center leading-normal rounded rounded-r-none border border-r-0 font-regular text-gray-700 border-gray-300 px-4 whitespace-no-wrap text-md">
                            Rp
                          </span>
                        </div>
                        <input
                          type="number"
                          placeholder="280000"
                          name="price"
                          value={form.price.toLocaleString()}
                          onChange={handleChange}
                          className="flex-shrink flex-grow flex-auto leading-normal w-px border h-14 border-gray-300 px-3 relative"
                        />
                        <div className="flex -mr-px">
                          <span className="flex items-center leading-normal rounded rounded-l-none border border-l-0 font-regular text-gray-700 border-gray-300 px-4 whitespace-no-wrap text-md">
                            per night
                          </span>
                        </div>
                      </div>

                      {/* Total Room */}
                      <label
                        for="room"
                        className="block text-xl font-medium text-gray-700"
                      >
                        How Many Rooms Do you provide?
                      </label>
                      <label
                        for="room"
                        className="block text-md font-medium text-gray-400"
                      >
                        You can change it anytime.
                      </label>
                      <div className="custom-number-input h-10 w-32">
                        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                          <button
                            type="button"
                            className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                            onClick={() => {
                              if (value > 1) {
                                handleClick(value - 1);
                              }
                            }}
                          >
                            <span className="m-auto text-2xl font-thin">−</span>
                          </button>
                          <input
                            className="outline-none focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                            name="room"
                            value={value}
                            onChange={handleChange}
                          />
                          <button
                            type="button"
                            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                            onClick={() => {
                              if (value < 100 ) {
                                handleClick(value + 1);
                              }
                            }}
                          >
                            <span className="m-auto text-2xl font-thin">+</span>
                          </button>
                        </div>
                      </div>

                      <div className="col-span-10 sm:col-span-10 mt-6">
                        <label
                          for="description"
                          className="block text-xl font-medium text-gray-700"
                        >
                          Create your description
                        </label>
                        <label
                          for="description"
                          className="block text-md font-medium text-gray-400"
                        >
                          Share what makes your place special
                        </label>
                        <input
                          type="text"
                          name="description"
                          placeholder="type your description.."
                          id="description"
                          autocomplete="description"
                          className="py-10 px-4 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                          value={form.description}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <fieldset className="mt-8">
                      <legend className=" text-base  text-1.5xl font-medium text-gray-900">
                        Room Accommodation
                      </legend>
                      <div className="grid grid-cols-4 mt-2 space-y-2">
                                  {accommodation ? accommodation.map((value, idx) => {
                                    return(
                                      <>
                                      <div className="flex place-items-center">
                                    <div className="flex items-center h-5">
                                      <input
                                        id={idx}
                                        name="accommodation"
                                        value={value.id}
                                        type="checkbox"
                                        className="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                                        onChange={handleChange}
                                      />
                                    </div>
                                    <div className="ml-3 text-md">
                                      <label
                                        for="accommodation"
                                        className="font-regular text-gray-700"
                                      >
                                        {value.name}
                                      </label>
                                    </div>
                                  </div>
                                      </>
                                    )
                                  }) : null}
                                </div>
                      <div>
                                  <div className="pt-8">
                                    <h7 className="font-medium text-s">
                                      Choose at least 4 photos
                                    </h7>
                                  </div>
                                  <input
                                    className="w-full px-3 py-2 mb-1 border bg-white border-gray-200 rounded-lg focus:outline-none focus:border-[#c9403e] transition-colors"
                                    type="file"
                                    id="formFile"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => onImagesValidation(e)}
                                  />
                                  <label className="text-gray-600 font-normal text-md mb-2 ml-1">
                                    * Multiple file max 2MB (.jpg or .png only)
                                  </label>
                                </div>
                    </fieldset>
                  </div>

                  <div className="mx-4 my-4 py-3 bg-white text-right sm:px-6">
                    {/* <button
                      type="button"
                      className="inline-block mr-6 rounded bg-[#c9403e] px-10 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-danger-700 "
                    >
                      EDIT
                    </button> */}
                    <button
                      type="button"
                      className="inline-block rounded bg-success px-10 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-success-600"
                      onClick={() => createRoom()}
                    >
                      {loading ? <Loader /> : "SAVE"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default CreateRoom;
