import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function PropertyList() {
  const [type, setType] = useState(0);
  const [city, setCity] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [property, setProperty] = useState([]);

  const navigate = useNavigate()

  const getTokenId = localStorage.getItem("tokenTid");

  const [form, setForm] = useState({
    city_id: "",
    type_id: "",
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

  const getCity = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}properties/city`);
      setCity(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getType = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}properties/type`);
      setType(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const tenantProperty = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}properties/tenant-property`,
        {
          city_id: form?.city_id,
          type_id: form?.type_id,
          page: currentPage,
        },
        {
          headers: {
            auth: getTokenId,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setProperty(res.data.data);
      setTotalPages(res.data.total_pages);

      console.log(res);
    } catch (error) {}
  };

  useEffect(() => {
    tenantProperty();
    getCity();
    getType();
  }, [currentPage, form]);

  if (!getTokenId) {
    navigate("/tenant-login");
  }

  return (
    <>
      {localStorage.getItem("tokenTid") && (
        <>
          {/* <NavbarDashboard /> */}

          {/* isi dashboard background*/}
          {/* <div className="sm:mx-6 md:mx-3 lg:mx-12 px-3 w-full"> */}
          <div
            id="main-content"
            className="h-full w-full bg-transparent rounded-lg relative overflow-y-auto z-0 "
          >
            {/* <div className="py-4 pb-20 px-4"> */}
            {/* isi dashboard data*/}

            <body className="antialiased bg-transparent">
              <div className="container md:mx-auto md:px-2">
                <div className="py-8">
                  <div>
                    <h2 className="text-2xl font-semibold leading-tight">
                      Property List
                    </h2>
                  </div>
                  <div className="my-2 flex sm:flex-row flex-col">
                    <div className="flex flex-row mb-1 sm:mb-0">
                      {/* city */}
                      <div className="relative">
                        <div className="flex">
                          <select
                            className=" h-full rounded-r border-t sm:rounded-r-none sm:border-r-1 sm:border-l border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-[9px] px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                            onChange={(e) => handleChange(e)}
                            value={form?.city_id}
                            name="city_id"
                          >
                            <option selected value={""}>
                              Select All City
                            </option>
                            {city
                              ? city.map((value, idx) => {
                                  return (
                                    <>
                                      <option value={value.id} key={idx}>
                                        {value?.city}
                                      </option>
                                    </>
                                  );
                                })
                              : "Loading"}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      {/* type */}
                      <div className="relative">
                        <div className="flex">
                          <select
                            className=" h-full rounded-r border-t sm:rounded-r-none sm:border-r-1 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-[9px] px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                            onChange={(e) => handleChange(e)}
                            value={form?.type_id}
                            name="type_id"
                          >
                            <option selected value={""}>
                              Select All type
                            </option>
                            {type
                              ? type.map((value, idx) => {
                                  return (
                                    <>
                                      <option value={value.id} key={idx}>
                                        {value?.name}
                                      </option>
                                    </>
                                  );
                                })
                              : "Loading"}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4x">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Property Name
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Edit Property
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Room 1
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Edit Room 1
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Room 2
                            </th>
                            <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Edit Room 2
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {property &&
                            property.map((value, index) => {
                              console.log(value);
                              return (
                                <>
                                  {/* <Modal /> */}
                                  <tr key={index} className="">
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <Link
                                        to={`/details/${value?.id}`}
                                      >
                                        <div className="flex flex-col items-center">
                                          <p className="text-gray-900 font-semibold mb-2 text-center">
                                            {value?.name}
                                          </p>
                                          <div className="overflow-hidden rounded-md w-36 h-24 bg-gray-50 border border-gray-200">
                                            <img
                                              src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${value?.property_images?.[0]?.image_path}`}
                                              alt=""
                                            />
                                          </div>
                                        </div>

                                        {/* <div className="flex items-center">
                                              <div className="overflow-hidden rounded-md w-36 h-24 bg-gray-50 border border-gray-200">
                                                <img
                                                  src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${value?.property_images?.[0]?.image_path}`}
                                                  alt=""
                                                />
                                              </div>
                                              <div className="ml-3">
                                                <p className="text-gray-900 text-center font-semibold">
                                                  {value?.name},{" "}
                                                </p>
                                              </div>
                                            </div> */}
                                      </Link>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                      <div className="flex justify-center items-center h-full">
                                        <Link to={'/dashboard-edit-property'} state={[value]}>
                                        <button className="text-gray-900 my-bg-rating px-3 py-3 rounded-lg shadow-md text-center font-semibold">
                                          Edit Property
                                        </button>
                                        </Link>
                                      </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      {value?.rooms?.length < 1 ? (
                                        <p className="text-gray-900 text-center font-semibold mb-2 text-center">
                                          Room 1 Not Available
                                        </p>
                                      ) : (
                                        <Link
                                        to={`/room-details/${value?.rooms?.[0]?.id}`}
                                      >
                                        <div className="flex flex-col items-center">
                                          <p className="text-gray-900 text-center font-semibold mb-2">
                                            {value?.rooms?.[0]?.name} Type Room
                                          </p>
                                          <div className="overflow-hidden rounded-md w-36 h-24 bg-gray-50 border border-gray-200">
                                            <img
                                              src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${value?.rooms?.[0]?.room_images?.[0]?.image_path}`}
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        </Link>
                                      )}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                      {value?.rooms?.length < 1 ? (
                                        <div className="flex justify-center items-center h-full">
                                          <Link
                                            to={"/dashboard-createroom"}
                                            state={value?.id}
                                          >
                                            <button className="text-gray-900 my-bg-rating px-3 py-3 rounded-lg shadow-md text-center font-semibold">
                                              Create Room 1
                                            </button>
                                          </Link>
                                        </div>
                                      ) : (
                                        <Link to={'/dashboard-edit-room'} state={value?.rooms?.[0]}>
                                        <div className="flex justify-center items-center h-full">
                                          <button className="text-gray-900 my-bg-rating px-3 py-3 rounded-lg shadow-md text-center font-semibold">
                                            Edit Room 1
                                          </button>
                                        </div>
                                        </Link>
                                      )}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      {value?.rooms?.length < 2 ? (
                                        <p className="text-gray-900 text-center font-semibold mb-2 text-center">
                                          Room 2 Not Available
                                        </p>
                                      ) : (
                                        <Link
                                        to={`/room-details/${value?.rooms?.[1]?.id}`}
                                      >
                                        <div className="flex flex-col items-center">
                                          <p className="text-gray-900 text-center font-semibold mb-2">
                                            {value?.rooms?.[1]?.name} Type Room
                                          </p>
                                          <div className="overflow-hidden rounded-md w-36 h-24 bg-gray-50 border border-gray-200">
                                            <img
                                              src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${value?.rooms?.[1]?.room_images?.[0]?.image_path}`}
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        </Link>
                                      )}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                      {value?.rooms?.length < 2 ? (
                                        <div className="flex justify-center items-center h-full">
                                          <Link
                                            to={"/dashboard-createroom"}
                                            state={value?.id}
                                          >
                                            <button className="text-gray-900 my-bg-rating px-3 py-3 rounded-lg shadow-md text-center font-semibold">
                                              Create Room 2
                                            </button>
                                          </Link>
                                        </div>
                                      ) : (
                                        <Link to={'/dashboard-edit-room'} state={value?.rooms?.[1]}>
                                        <div className="flex justify-center items-center h-full">
                                          <button className="text-gray-900 my-bg-rating px-3 py-3 rounded-lg shadow-md text-center font-semibold">
                                            Edit Room 2
                                          </button>
                                        </div>
                                        </Link>
                                      )}
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                        </tbody>
                      </table>
                      <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span className="text-xs xs:text-sm text-gray-900">
                          Showing 1 to {property?.length} data of {totalPages}{" "}
                          Pages
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                          <button
                            className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                            onClick={() => {
                              if (currentPage > 1) {
                                setCurrentPage(currentPage - 1);
                              }
                            }}
                          >
                            Prev
                          </button>
                          <button
                            className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                            onClick={() => {
                              if (currentPage < totalPages) {
                                setCurrentPage(currentPage + 1);
                              }
                            }}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </body>
          </div>
          {/* </div> */}
          {/* </div> */}
        </>
      )}
    </>
  );
}

export default PropertyList;
