import axios from "axios";
import { useEffect, useState } from "react";
import Location from "../location/location";
import PropertyType from "../property_type/type";
import toast, { Toaster } from "react-hot-toast";
import Loader from "components/loader/loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "./../tenant/modal/modalTenant"

function EditProperty() {
  const location = useLocation();
  const data = location?.state;
  const navigate = useNavigate()
  console.log(data);

  const [city, setCity] = useState([]);
  const [type, setType] = useState([]);
  const [accommodation, setAccommodation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [propertyId, setPropertyId] = useState([]);

  const getTokenId = localStorage.getItem("tokenTid");

  const [form, setForm] = useState({
    city: data?.[0]?.locations?.[0]?.city_id,
    city_name: "",
    type: data?.[0]?.type_id,
    location: data?.[0]?.locations?.[0]?.name,
    address: data?.[0]?.address,
    name: data?.[0]?.name,
    description: data?.[0]?.description,
    accommodation: data?.[0]?.property_connectors,
  });

  console.log(form)


  const editProperty = async () => {
    try {
      setLoading(true);
      if (form?.city === 0) throw { message: "Please Select a City " };
      if (form?.type === 0)
        throw { message: "Please Select a Type" };
      if (form?.location === 0)
        throw { message: "Please Fill your Subdistrict" };
      if (form?.name === 0)
        throw { message: "Please Fill Property Name" };
      if (form?.description === 0)
        throw { message: "Please Fill Property Description" };
      if (form?.accommodation === 0) throw { message: "Select Accommodation" };

      const property = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}properties/edit-property`,
        {
            name: form?.name,
            address: form?.address,
            description: form?.description,
            type_id: form?.type,
            city_id: form?.city,
            city_name: form?.city_name,
            location: form?.location,
            property_id: data?.[0]?.id,
            property_accommodation: form?.accommodation
        },
        {
          headers: {
            auth: getTokenId,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setPropertyId(property?.data?.data);
      setTimeout(() => {
        toast.success(property?.data?.message);
      }, 4500);
      setTimeout(() => {
        navigate('/dashboard-propertylist')
      },5500)
    } catch (error) {
      setLoading(false);
      if (
        error.message === "Request failed with status code 400" ||
        error.message === "Request failed with status code 404"
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  };

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

  let getCity = async () => {
    try {
      const cities = await axios.get(`${process.env.REACT_APP_API_BASE_URL}properties/city`);
      setCity(cities.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let getType = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}properties/type`);
      setType(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let getPropertyAccommodation = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}properties/property-accommodation`
      );
      setAccommodation(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getCity();
    getType();
    getPropertyAccommodation();
  }, [form]);

  if (!getTokenId) {
    navigate("/tenant-login");
  }

  return (
    <>
      <div className="relative my-bg-light md:pt-20 pb-32 mt-5 shadow-lg rounded-lg">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="w-full h-14 pt-2 text-center  bg-gray-700  shadow overflow-hidden sm:rounded-t-lg font-bold text-3xl text-white ">
            Edit Property
          </div>

          <div className="border rounded-b-lg border-gray-300 mx-auto">
            <div className="w-full uppercase h-10 mt-14  text-center overflow-hidden sm:rounded-t-lg font-bold text-xl  text-black ">
              Property Category
            </div>

            <div className="mt-10 md:mt-0 md:col-span-2">
              <form>
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
                          name="type"
                        />
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
                          name="city"
                        />
                      </div>
                      <div className="col-span-10 sm:col-span-10">
                        <label
                          for="location"
                          className="block text-xl font-medium text-gray-700"
                        >
                          Subdistrict
                        </label>
                        <input
                          type="text"
                          placeholder="type your subdistrict.."
                          id="location"
                          autocomplete="location"
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
                          Short titles work best, you can always change it later
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
                    <fieldset className="mt-8 overflow-y-auto">
                      <legend className=" text-base text-1.5xl font-medium text-gray-900">
                        Property Accommodation
                      </legend>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2 space-y-2 whitespace-nowrap">
                        {accommodation
                          ? accommodation.map((value, idx) => {
                              const isChecked =
                                data?.[0]?.property_connectors?.some(
                                  (connector) =>
                                    Number(connector.property_accommodation_id) ===
                                    Number(value.id)
                                );
                              return (
                                <>
                                  <div className="flex place-items-center">
                                    <div className="flex items-center h-5">
                                      <input
                                        id={idx}
                                        name="accommodation"
                                        value={value.id}
                                        defaultChecked={isChecked}
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
                              );
                            })
                          : null}
                      </div>
                     </fieldset>
                  </div>

                  

                  <div className="md:mx-4 md:my-4 md:py-3 bg-white flex whitespace-nowrap justify-between md:px-6 overflow-x-auto">
                  <div className="">
                    <button
                        type="button"
                        className="inline-block mr-6 rounded my-bg-light px-2 whitespace-nowrap md:px-10 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal my-main shadow-lg transition duration-150 ease-in-out hover:bg-slate-200 "
                        data-te-target="#deleteProperty"
                        data-te-toggle="modal"
                      >
                        DELETE PROPERTY
                      </button>
                  </div>

                  <div className="">
                  <button
                      type="button"
                      className="inline-block mr-6 rounded bg-[#c9403e] px-2 whitespace-nowrap md:px-10 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-danger-700 "
                      data-te-target="#editPropertyPicture"
                      data-te-toggle="modal"
                    >
                      EDIT PROPERTY PICTURE
                    </button>
                      <button
                        type="button"
                        className="inline-block rounded bg-success px-10 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-success-600"
                        onClick={() => editProperty()}
                      >
                        {loading ? <Loader /> : "SAVE"}
                      </button>
                  </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Modal propertyId={data?.[0]?.id}/>
        <Toaster />
      </div>
    </>
  );
}

export default EditProperty;
