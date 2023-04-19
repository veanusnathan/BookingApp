import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function SalesReportRoom() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [property, setProperty] = useState([]);
  const [report, setReport] = useState([]);

  const location = useLocation()
  const id = location?.state

  // const {report} = props;

  const navigate = useNavigate();

  const getTokenId = localStorage.getItem("tokenTid");

  const [form, setForm] = useState({
    sort: "",
    page: currentPage,
    start_date: "",
    end_date: "",
    room_id: id,
  });

  console.log(form);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const _form = {
      ...form,
      [name]: value,
    };
    setForm(_form);
    console.log(_form);
  };

  const handleClearForm = () => {
    setForm({
        sort: "",
        page: currentPage,
        start_date: "",
        end_date: "",
        room_id: id,
    });
  };

  const getSales = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}transaction/sales-reportRoom`,
        {
          sort: form?.sort,
          start_date: form?.start_date,
          end_date: form?.end_date,
          room_id: form?.room_id,
          page: currentPage,
        }
      );
      console.log(res)
      setReport(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    const format = date.split("T")[0]
    const format1 = new Date(format)
    const newDate = format1.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    return newDate
  }

  const totalDays = (check_in, check_out) => {
    const startDate = check_in.split("T")[0].split("-")[2]
    const endDate = check_out.split("T")[0].split("-")[2]
    let totalDays = endDate - startDate
    return totalDays
  }

  const getProfilePicture = (picturePath) => {
    if(picturePath && picturePath.includes("https")){
      return picturePath
    }else if(picturePath && picturePath.includes("Public")){
      return `${process.env.REACT_APP_API_BASE_URL}${picturePath}`
    }else{
      return `https://tecdn.b-cdn.net/img/new/avatars/2.webp`
    }
  }

  const revenueTotal = report.reduce((acc, curr) => {
    return acc + curr.total_price
  }, 0)


  useEffect(() => {
    getSales();
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
              <div className="container mx-auto px-2">
                <div className="py-8">
                  <div>
                    <h2 className="text-2xl font-semibold leading-tight">
                      Sales Report Room
                    </h2>
                  </div>
                  <div className="my-2 flex sm:flex-row flex-col">
                    <div className="flex flex-row mb-1 sm:mb-0">
                      {/* city */}

                      {/* type */}
                      <div className="relative">
                        <div className="flex">
                          <select
                            className=" h-full rounded-r border-t sm:rounded-r-none sm:border-r-1 sm:border-l border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-[9px] px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                            onChange={(e) => handleChange(e)}
                            value={form?.sort}
                            name="sort"
                          >
                            <option selected value="">
                              Sort By Total Price
                            </option>
                            <option value="asc">Lowest</option>
                            <option value="desc">Highest</option>
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
                          {/* Calendar */}
                          <div className="relative">
                            <div className="flex">
                              {/* start date */}
                              <input
                                type="date"
                                placeholder="Start Date"
                                className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-1 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                value={form.start_date}
                                name="start_date"
                                onChange={handleChange}
                              />
                              {/* endDate */}
                              <input
                                type="date"
                                className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-1 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                value={form.end_date}
                                name="end_date"
                                onChange={handleChange}
                              />
                              {form?.start_date && (
                                <button
                                  className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-1 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-[9px] px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                  onClick={handleClearForm}
                                >
                                  Clear Dates
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Room Type
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Total Revenue
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Check In
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Check Out
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Total Days
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Average Stars
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Renters
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {report &&
                            report.map((value, index) => {
                              return (
                                <>
                                  <tr key={index} className="">
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:scale-105 duration-500">
                                      <Link to={`/tenant-transaction/${value?.room_id}/${value?.order_id}`} state={value?.users_id}
                                      >
                                        <div className="flex flex-col items-center">
                                          <p className="text-gray-900 font-semibold mb-2 text-center">
                                            {value?.room?.name}
                                          </p>
                                          <div className="overflow-hidden rounded-md w-36 h-24 bg-gray-50 border border-gray-200">
                                            <img
                                              src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${value?.room?.room_images?.[0]?.image_path}`}
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                      </Link>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm hover:scale-105 duration-500">
                                      <div className="flex justify-center items-center h-full">
                                        <span className="text-gray-900 px-3 py-3 rounded-lg shadow-md text-center font-semibold">
                                          Rp.{" "}
                                          {value?.total_price?.toLocaleString() ?? 0}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm hover:scale-105 duration-500">
                                      <div className="flex justify-center items-center h-full">
                                        <span className="text-gray-900 px-3 py-3 rounded-lg shadow-md text-center font-semibold">
                                          {formatDate(value?.check_in)}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm hover:scale-105 duration-500">
                                      <div className="flex justify-center items-center h-full">
                                        <span className="text-gray-900 px-3 py-3 rounded-lg shadow-md text-center font-semibold">
                                          {formatDate(value?.check_out)}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm hover:scale-105 duration-500">
                                      <div className="flex justify-center items-center h-full">
                                        <span className="text-gray-900 px-3 py-3 rounded-lg shadow-md text-center font-semibold">
                                          {totalDays(value?.check_in, value?.check_out )} Day's
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm hover:scale-105 duration-500">
                                      <div className="flex justify-center items-center h-full">
                                        <span className="text-gray-900 px-3 py-3 rounded-lg shadow-md text-center font-semibold flex items-center">
                                          <span>
                                            {value?.room?.rating ?? 0}
                                          </span>{" "}
                                          <span className="ml-1 my-rating">
                                            <FaStar />
                                          </span>
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm hover:scale-105 duration-500">
                                    <div className="flex flex-col items-center">
                                          <p className="text-gray-900 font-semibold mb-2 text-center">
                                            {(value?.user?.first_name && value?.user?.last_name) ? `${value.user.first_name} ${value.user.last_name}` : value?.user?.first_name}
                                          </p>
                                            <img
                                              src={getProfilePicture(value?.user?.users_detail?.picture_path)}
                                              className="w-24 rounded-full shadow-lg"
                                              alt="Avatar"
                                            />
                                        </div>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                        </tbody>
                      </table>
                      <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                        <span className="text-xs xs:text-sm text-gray-900">
                          Page {currentPage}, Showing 1 to {report?.length} data of {totalPages}{" "}
                          Pages
                        </span>

                        <span className="font-semibold text-xl uppercase">
                        <span>Total Revenue</span> Rp. {revenueTotal.toLocaleString() ?? 0}
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

export default SalesReportRoom;
