import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function SalesReport(){
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [report, setReport] = useState([])
  
    const navigate = useNavigate()
  
    const getTokenId = localStorage.getItem("tokenTid");
  
    const [form, setForm] = useState({
      sort: "",
      page: currentPage
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
  
    const getSales = async() => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}transaction/sales-report`,
        {
                  sort: form?.sort,
                  page: currentPage,
                },
                {
                  headers: {
                    auth: getTokenId,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                }
        )
        setReport(res.data.data)
        setTotalPages(res.data.total_pages)
      } catch (error) {
        console.log(error)
      }
    }

    const revenueTotal = report.reduce((acc, curr) => {
      return acc + curr.revenue
    }, 0)
  
    useEffect(() => {
      getSales()
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
            
            <div
              id="main-content"
              className="h-full w-full bg-transparent rounded-lg relative overflow-y-auto z-0 "
            >
              
              {/* isi dashboard data*/}
  
              <body className="antialiased bg-transparent">
                <div className="container md:mx-auto md:px-2">
                  <div className="py-8">
                    <div>
                      <h2 className="text-2xl font-semibold leading-tight">
                        Sales Report Property
                      </h2>
                    </div>
                    <div className="my-2 flex sm:flex-row flex-col">
                      <div className="flex flex-row mb-1 sm:mb-0">
                        
                        {/* Sort */}
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
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
                      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                          <thead>
                            <tr>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Property Name
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Total Revenue
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Total Bookings
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Average Stars
                              </th>
                            </tr>
                          </thead>
  
                          <tbody>
                            {report &&
                              report.map((value, index) => {
                                console.log(value)
                                return (
                                  <>
                                    {/* <Modal /> */}
                                    <tr key={index} className="">
                                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:scale-105 duration-500">
                                        <Link
                                          to={`/dashboard-sales-report-room`} state={`${value?.room?.id}`}
                                        >
                                          <div className="flex flex-col items-center">
                                            <p className="text-gray-900 font-semibold mb-2 text-center">
                                              {value?.property?.name}
                                            </p>
                                            <div className="overflow-hidden rounded-md w-36 h-24 bg-gray-50 border border-gray-200">
                                              <img
                                                src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${value?.room?.property?.property_images?.[0]?.image_path}`}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                        </Link>
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 text-sm hover:scale-105 duration-500">
                                        <div className="flex justify-center items-center h-full">
                                          <span className="text-gray-900 px-3 py-3 rounded-lg shadow-md text-center font-semibold">
                                            Rp. {value?.revenue.toLocaleString() ?? 0}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 text-sm hover:scale-105 duration-500">
                                        <div className="flex justify-center items-center h-full">
                                          <span className="text-gray-900 px-3 py-3 rounded-lg shadow-md text-center font-semibold">
                                            {value?.bookings_count ?? 0} Time's
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-5 py-5 border-b border-gray-200 text-sm hover:scale-105 duration-500">
                                        <div className="flex justify-center items-center h-full">
                                          <span className="text-gray-900 px-3 py-3 rounded-lg shadow-md text-center font-semibold flex items-center">
                                            <span>{value?.room?.rating ?? 0}</span> <span className="ml-1 my-rating"><FaStar /></span>
                                          </span>
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                          </tbody>
                        </table>
                        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
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

export default SalesReport;