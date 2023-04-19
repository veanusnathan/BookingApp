import EditProperty from "components/edit_property/edit_property";
import { useLocation } from "react-router-dom";

function Location(props) {
  const {name, value, onChange, city , defaultValue} = props;
  const location = useLocation()

  const id = location?.pathname.split("/")[2]
  console.log(id)

  const carousel = location.pathname === '/'
  const category = location.pathname === `/category/${id}`
  const tenantCity = location.pathname === '/dashboard-createlisting'
  const editProperty = location.pathname === '/dashboard-edit-property'
  return (
    <>
     {carousel || category ? <div className="flex justify-center rounded-lg">
        <div className="pt-3 mb-4 xl:w-full ">
          <select name={name} value={value} onChange={onChange} >
          <option value="" disabled selected>Select a city</option>
            {city ? city.map((value, idx) => {
              return (
                <>
                <option value={idx + 1} key={idx}>{value.city}</option>
                </>
              )
            })
            :
            "Loading.."
            }
            
          </select>
        </div>
      </div> : null}


      {/* dashboard City */}
      {localStorage.getItem('tokenTid') ? 
      <>
      {tenantCity && 
          <select name={name} value={value} onChange={onChange} className="mt-1 block w-full py-4 px-3  border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md" >
          <option value="" disabled selected className="ml-5">Select a city</option>
            {city ? city.map((value, idx) => {
              return (
                <>
                <option value={idx + 1} key={idx}>{value.city}</option>
                </>
              )
            })
            :
            "Loading.."
            }
            
          </select>}
      </> : null}

      {/* dashboard edit Property */}
      {localStorage.getItem('tokenTid') ? 
      <>
      {editProperty && 
          <select name={name} value={value} onChange={onChange} className="mt-1 block w-full py-4 px-3  border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md" >
          <option value="" disabled selected className="ml-5">{defaultValue ? defaultValue.city : "Select a city"}</option>
            {city ? city.map((value, idx) => {
              return (
                <>
                <option value={idx + 1} key={idx}>{value.city}</option>
                </>
              )
            })
            :
            "Loading.."
            }
            
          </select>}
      </> : null}
    </>
  );
}

export default Location;
