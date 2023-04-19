import React, { useRef, useState, useEffect } from "react";
import Date from "./../date/date";
import Location from "./../location/location";
import { useLocation, useParams } from "react-router-dom";
import CalendarFunc from "pages/room_details/Calendar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Carousel() {
  const location = useLocation();
  const id = useParams();

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    location: "",
  });

  const [city, setCity] = useState([]);

  // const currentDate = new Date().toISOString().split('T')[0];
  // const maxDate = currentDate;

  let getCity = async () => {
    try {
      const cities = await axios.get(`${process.env.REACT_APP_API_BASE_URL}properties/city`);
      setCity(cities.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let getDate = async () => {
    try {
      const details = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}properties/search-date?check_in=${form.startDate}&check_out=${form.endDate}&city=${form.location}&page=1`
      );
      console.log(details);
      if (details?.data?.data?.length !== 0) {
        const searchData = details.data;
        const searchParams = new URLSearchParams({
          startDate: form.startDate,
          endDate: form.endDate,
          location: form.location,
          ...searchData,
        });
        toast.success("Get the Property");
        setTimeout(() => {
          const redirectUrl = `/search-results?${searchParams.toString()}`;
          window.location.href = redirectUrl;
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getCity();
  }, []);

  const [error, setError] = useState({
    startDate: "",
    endDate: "",
    location: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const _form = {
      ...form,
      [name]: value,
    };

    setForm(_form);
    console.log(_form);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    // Check if any of the required fields are empty
    let hasError = false;
    const requiredFields = ["startDate", "endDate", "location"];
    let _error = { ...error };

    for (const field of requiredFields) {
      if (!form[field]) {
        _error = {
          ..._error,
          [field]: "gaboleh kosong",
        };
      } else {
        _error[field] = false;
      }
    }

    // If there are errors, set the errors state and return
    if (hasError) {
      setError(_error);
      return;
    }
    getDate();
  };
  return (
    <>
      {location.pathname === "/" &&
      location.pathname === `/category/${id}` ? null : (
        <div className="container my-12 px-6 mx-auto">
          <section className="mb-10 text-gray-800">
            <div
              className="relative overflow-hidden bg-no-repeat bg-cover rounded-lg shadow-lg"
              style={{
                backgroundPosition: "100%",
                backgroundImage:
                "url(" + process.env.REACT_APP_API_BASE_URL + "Public/PROPERTY/guesthouse-surabaya-lakarsantri-cheerful-1-1.webp)",
                height: "300px",
                maxHeight: "50vh",
              }}
            ></div>
            <div className="container text-gray-800 px-4 md:px-12">
              <div
                className="block rounded-lg shadow-lg py-3 md:py-3 px-4 md:px-6"
                style={{
                  marginTop: "-30px",
                  background: "hsla(0, 0%, 100%, 0.8)",
                  backdropFilter: "blur(30px)",
                }}
              >
                <div className="flex flex-wrap justify-center text-center lg:text-left">
                  <div className="grow-0 shrink-0 basis-auto w-full xl:w-10/12 px-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 items-center">
                      <div className="mb-0">
                        <div className="text-md xl:text-xl font-bold">
                          <span className="mx-auto xxl:mx-12"> Start Date</span>
                          <br />
                          <span className="my-main">
                            <Date
                              onChange={handleChange}
                              value={form.startDate}
                              name="startDate"
                            />
                          </span>
                          {/* <p className="text-lg my-main">{error.startDate}</p> */}
                        </div>
                      </div>
                      <div className="mb-0">
                        <div className="text-md xl:text-xl font-bold">
                          <span className="mx-auto xxl:mx-12">End Date</span> 
                          <br />
                          <span className="pt-5">
                            <Date
                              onChange={handleChange}
                              value={form.endDate}
                              name="endDate"
                            />
                          </span>
                          {/* <p className="text-lg my-main">{error.endDate}</p> */}
                        </div>
                      </div>
                      <div className="mb-0">
                        <div className="text-md xl:text-xl font-bold">
                          <span className="">Select Location</span> 
                          <br />
                          <span className="my-main">
                            <Location
                              onChange={handleChange}
                              city={city}
                              place
                              value={form.location}
                              name="location"
                            />
                          </span>
                          <p className="text-lg my-main">{error.location}</p>
                        </div>
                      </div>

                      <div className="mb-6 md:mb-0">
                        <div className="flex flex-row justify-center">
                          {/* <input
                      type="text"
                      className="form-control block w-full px-4 py-2 mb-2 md:mb-0 md:mr-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Enter your email"
                    /> */}
                          <button
                            type="submit"
                            className="inline-block px-7 py-3 my-bg-button-dark text-white font-medium text-sm leading-snug uppercase rounded shadow-md shadow-gray-300 hover:bg-emerald-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-700 active:shadow-lg transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={handleSubmit}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Toaster />
        </div>
      )}
    </>
  );
}

export default Carousel;
