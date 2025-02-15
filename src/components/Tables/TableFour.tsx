import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { useEffect } from "react";
import { fetchLocation } from "../../store/authSlice"

const TableFour = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { locations, token } = useSelector((state: RootState) => ({
    locations: state.auth.locations || [],
    token: state.auth.token,
  }));

  useEffect(() => {
    if (token) {
      dispatch(fetchLocation({ token }));
    }
  }, [dispatch, token]);

  console.log("locations", locations);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Device Locations
        </h4>
      </div>

      <div className="grid grid-cols-3 border-t border-stroke py-4.5 px-2 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Device ID</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Latitude</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Longitude</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Timestamps</p>
        </div>
      </div>

      {locations?.map((location: any, index: number) =>
        location.locations.map((loc: any, locIndex: number) => (
          <div
            className={`grid grid-cols-6 sm:grid-cols-8 ${
              locIndex === location.locations.length - 1 &&
              index === locations.length - 1
                ? ""
                : "border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5"
            }`}
            key={loc._id}
          >
            <div className="col-span-2 items-center flex xl:py-5 xl:px-7">
              <p className="text-sm text-black dark:text-white">
                {location.deviceId}
              </p>
            </div>
            <div className="col-span-2 items-center flex xl:py-5 xl:px-4">
              <p className="text-sm text-black dark:text-white">
                {loc.latitude}
              </p>
            </div>
            <div className="col-span-2 items-center flex xl:py-5">
              <p className="text-sm text-black dark:text-white">
                {loc.longitude}
              </p>
            </div>
            <div className="col-span-2 items-center flex xl:py-5">
              <p className="text-sm text-black dark:text-white">
                {new Date(loc.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TableFour;
