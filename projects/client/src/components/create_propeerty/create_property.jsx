import axios from "axios"
import { useEffect, useState } from "react";
import Location from "components/location/location";
import PropertyType from "components/property_type/type";
import toast, { Toaster } from "react-hot-toast";
import Loader from "components/loader/loader";
import { Link, useNavigate } from "react-router-dom";



function CreateProperty(){

  const [city, setCity] = useState([]);
  const [type, setType] = useState([])
  const [accommodation, setAccommodation] = useState([])
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [propertyId, setPropertyId] = useState([])
  const navigate = useNavigate()

  const getTokenId = localStorage.getItem("tokenTid")

  const[form, setForm] = useState({
    city: "",
    city_name: "",
    type: "",
    location: "",
    name:"",
    description: "",
    accommodation: []
  })



  const createProperty = async() => {
    try {
      setLoading(true)
      let fd = new FormData();
      if (!selectedImages) throw { message: "please Upload Your Image" };
      selectedImages.forEach((value) => {
        fd.append("PROPERTY", value);
      });

      fd.append('name', form?.name)
      fd.append('address', form?.address)
      fd.append('description', form?.description)
      fd.append('type_id', form?.type)
      fd.append('city_id', form?.city)
      fd.append('city_name', form?.city_name)
      fd.append('location', form?.location)
      fd.append('property_accommodation', form?.accommodation)

        const property = await axios.post(`${process.env.REACT_APP_API_BASE_URL}properties/create-property`, fd ,
        {
          headers: {
            auth: getTokenId,
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        })

        setPropertyId(property?.data?.data)
        setTimeout(() => {
          toast.success(property?.data?.message)
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
      }, 4000);
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
  }

  let getCity = async () => {
    try {
      const cities = await axios.get(`${process.env.REACT_APP_API_BASE_URL}properties/city`);
      setCity(cities.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let getType = async() => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}properties/type`)
      setType(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  let getPropertyAccommodation = async() => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}properties/property-accommodation`)
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

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000); 
  };

  useEffect(() => {
    getCity();
    getType();
    getPropertyAccommodation()
  }, []);

  if (!getTokenId) {
    navigate("/tenant-login");
  }



    return(
        <>
        <div className="relative my-bg-light md:pt-20 pb-32 mt-5 shadow-lg rounded-lg">
                  <div className="px-4 md:px-10 mx-auto w-full">
                    <div className="w-full h-14 pt-2 text-center  bg-gray-700  shadow overflow-hidden sm:rounded-t-lg font-bold text-3xl text-white ">
                      Create a new listing
                    </div>

                    <div className="border rounded-b-lg border-gray-300 mx-auto">
                      <div className="w-full uppercase h-10 mt-14  text-center overflow-hidden sm:rounded-t-lg font-bold text-xl  text-black ">
                        Property Category
                      </div>

                      <div className="mt-10 md:mt-0 md:col-span-2">
                        <form action="#" method="POST">
                          <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-2 py-2 bg-white sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-10 sm:col-span-10">
                                  <label
                                    for="type"
                                    className="block text-xl font-medium text-gray-700"
                                  >
                                    Which of these best describes your place?
                                  </label>
                                  <PropertyType
                                  onChange={handleChange}
                                  type={type}
                                  value={form.type}
                                  name="type"/>
                                </div>
                              </div>
                              <div className="w-full uppercase h-10 mt-20 text-center overflow-hidden sm:rounded-t-lg font-bold text-xl text-black ">
                                Property Details
                              </div>

                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-10 sm:col-span-10">
                                  <label
                                    for="city"
                                    className="block text-xl font-medium text-gray-700"
                                  >
                                    Where's your place located?
                                  </label>
                                  <Location 
                                  onChange={handleChange}
                                  city={city}
                                  value={form.city}
                                  name="city"/>
                                </div>
                                <div className="col-span-10 sm:col-span-10">
                                  <label
                                    for="last-name"
                                    className="block text-xl font-medium text-gray-700"
                                  >
                                    Subdistrict
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="type your subdistrict.."
                                    id="location"
                                    autocomplete="family-name"
                                    className="py-4 px-4 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                                    onChange={handleChange}
                                    value={form.location}
                                    name="location"
                                  />
                                </div>

                                <div className="col-span-10 sm:col-span-10">
                                  <label
                                    for="address"
                                    className="block text-xl font-medium text-gray-700"
                                  >
                                    Street address
                                  </label>
                                  <input
                                    type="text"
                                    name="address"
                                    placeholder="type your address.."
                                    id="address"
                                    autocomplete="address"
                                    className="py-4 px-4 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                                    onChange={handleChange}
                                    value={form.address}
                                  />
                                </div>
                                <div className="col-span-10 sm:col-span-10">
                                  <label
                                    for="name"
                                    className="block text-xl font-medium text-gray-700"
                                  >
                                    Give a title to your property
                                  </label>
                                  <label
                                    for="name"
                                    className="block text-md font-medium text-gray-400"
                                  >
                                    Short titles work best, you can always
                                    change it later
                                  </label>

                                  <input
                                    type="text"
                                    name="name"
                                    placeholder="type your property title.."
                                    id="name"
                                    autocomplete="name"
                                    className="py-4 px-4 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                                    onChange={handleChange}
                                    value={form.name}
                                  />
                                </div>

                                <div className="col-span-10 sm:col-span-10">
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
                                    onChange={handleChange}
                                    value={form.description}
                                  />
                                </div>
                              </div>

                              {/* legend */}
                              <fieldset className="mt-8">
                                <legend className=" text-base  text-1.5xl font-medium text-gray-900">
                                  Property Accommodation
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
                              <button
                                type="button"
                                className="inline-block mr-6 rounded bg-[#c9403e] px-10 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-danger-700 "
                              >
                                EDIT
                              </button>
                              {/* <Link to={'/dashboard-createroom'} state={propertyId} > */}
                              <button
                                type="button"
                                className="inline-block rounded bg-success px-10 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-success-600"
                                onClick={() => createProperty()}
                              >
                                {loading ? <Loader /> : "SAVE"}
                              </button>
                              {/* </Link> */}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <Toaster />
                </div>
        </>
    )
}

export default CreateProperty;