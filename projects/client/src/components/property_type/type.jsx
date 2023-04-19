import { useLocation } from "react-router-dom";

function PropertyType(props) {
  const { name, value, onChange, type, defaultValue } = props;
  const location = useLocation();
  const tenantType = location.pathname === "/dashboard-createlisting"
  const editProperty = location.pathname === "/dashboard-edit-property";
  return (
    <>
      {/* dashboard Type */}
      {localStorage.getItem("tokenTid") ? (
        <>
          {tenantType && (
            <select
              name={name}
              value={value}
              onChange={onChange}
              className="mt-1 block w-full py-4 px-3  border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            >
              <option value="" disabled selected className="ml-5">
                Select a Type
              </option>
              {type
                ? type.map((value, idx) => {
                    return (
                      <>
                        <option value={idx + 1} key={idx}>
                          {value.name}
                        </option>
                      </>
                    );
                  })
                : "Loading.."}
            </select>
          )}
        </>
      ) : null}

      {/* dashboard edit Property */}
      {localStorage.getItem("tokenTid") ? (
        <>
          {editProperty && (
            <select
              name={name}
              value={value}
              onChange={onChange}
              className="mt-1 block w-full py-4 px-3  border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
            >
              <option value="" disabled selected className="ml-5">
              {defaultValue ? defaultValue.name : "Select a type"}
              </option>
              {type
                ? type.map((value, idx) => {
                    return (
                      <>
                        <option value={idx + 1} key={idx}>
                          {value.name}
                        </option>
                      </>
                    );
                  })
                : "Loading.."}
            </select>
          )}
        </>
      ) : null}
    </>
  );
}

export default PropertyType;
