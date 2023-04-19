import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Review(props) {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [_reviews, setReview] = useState([]);

  useEffect(() => {
    review();
  }, [currentPage]);


  let stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(i);
  }

  const review = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}properties/reviews?room_id=${id}&page=${currentPage}`
      );

      setTotalPages(res.data.total_pages);
      setReview(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfilePicture = (picturePath) => {
    if (picturePath && picturePath.includes("https")) {
      return picturePath;
    } else if (picturePath && picturePath.includes("Public")) {
      return `${process.env.REACT_APP_API_BASE_URL}${picturePath}`;
    } else {
      return `https://tecdn.b-cdn.net/img/new/avatars/2.webp`;
    }
  };

  return (
    <>   
        <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-start items-center">
          <div className="flex flex-col justify-start items-start w-full space-y-8">
            
            <div className="wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {/* dummy comment */}
            <div className="w-full flex justify-start items-start flex-col my-bg-light shadow-md rounded-lg p-8">
              <div className="flex flex-col md:flex-row justify-between w-full">
                <div className="flex flex-row justify-between items-start">
                  <p className="text-xl md:text-2xl font-medium leading-normal text-gray-800 ">
                    {props?.details?.[0]?.property?.name},{" "}
                    {props?.details?.[0]?.name}
                  </p>
                </div>
              </div>
              <div id="menu" className="container">
                <p className="mt-3 text-base leading-normal text-gray-600 w-full  text-justify">
                Ruangan hotel yang saya tempati sangatlah nyaman dan bersih. Ukurannya cukup luas dan dilengkapi dengan berbagai fasilitas yang memadai, seperti tempat tidur yang empuk, meja kerja yang cukup besar, kulkas mini, serta televisi layar datar dengan banyak saluran. 
                </p>
                <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                  <div>
                    <img
                      src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                      className="w-32 rounded-full"
                      alt="avatar"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start space-y-2 w-full">
                    <p className="text-base font-medium leading-none text-gray-800 ">
                      Gigi Hartono
                    </p>
                    <p className="text-sm leading-none text-gray-600 ">
                      2023-02-30
                    </p>
                    <div className="cursor-pointer mt-2 md:mt-0">
                      <ul class="flex justify-center">
                        {stars.map((value, index) => (
                          <li key={index}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="mr-1 h-5 w-5 text-warning"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {_reviews
              ? _reviews.map((value, idx) => {

                  return (
                    <>
                      <div
                        className="w-full flex justify-start items-start flex-col my-bg-light shadow-md rounded-lg p-8"
                        key={idx}
                      >
                        <div className="flex flex-col md:flex-row justify-between w-full">
                          <div className="flex flex-row justify-between items-start">
                            <p className="text-xl md:text-2xl font-medium leading-normal text-gray-800 ">
                              {props?.details?.[0]?.property?.name},{" "}
                              {props?.details?.[0]?.name}
                            </p>
                          </div>
                        </div>
                        <div id="menu" className="container">
                          <p className="mt-3 text-base leading-normal text-gray-600 w-full ">
                            {value?.review}
                          </p>
                          <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                            <div>
                              <img
                                src={getProfilePicture(
                                  value?.user?.users_detail?.picture_path
                                )}
                                className="w-32 rounded-full"
                                alt="avatar"
                              />
                            </div>
                            <div className="flex flex-col justify-start items-start space-y-2 w-full">
                              <p className="text-base font-medium leading-none text-gray-800 ">
                                {value?.user?.first_name}{" "}
                                {value?.user?.last_name}
                              </p>
                              <p className="text-sm leading-none text-gray-600 ">
                                  {value?.createdAt?.split("T")[0]}
                              </p>
                              <div className="cursor-pointer mt-2 md:mt-0">
                            <ul class="flex justify-center">
                              {Array.from(
                                { length: value.rating },
                                (_, index) => (
                                  <li key={index}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      class="mr-1 h-5 w-5 text-warning"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                  </li>
                                )
                              )}
                              {Array.from(
                                { length: 5 - value.rating },
                                (_, index) => (
                                  <li key={index}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      class="mr-1 h-5 w-5 text-warning"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                      />
                                    </svg>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              : null}
          </div>
        </div>
      </div>
      {_reviews?.length > 3 ? (
        <div className="flex justify-end mt-2 xs:mt-0 w-full pr-5">
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
      ) : null}
    </>
  );
}

export default Review;