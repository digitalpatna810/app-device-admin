import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/Store';
import { useEffect } from 'react'
import { fetchUsers } from '../../store/authSlice';

const brandData: BRAND[] = [
  {
    logo: BrandOne,
    name: 'Aman',
    email: "test1@gmail.com",
    numbers: 2131231231,
    role: "User",
    deviceId: 487878,
  },
  {
    logo: BrandOne,
    name: 'Anshu',
    email: "test541@gmail.com",
    numbers: 2131631231,
    role: "Student",
    deviceId: 487878,
  },
  {
    logo: BrandOne,
    name: 'Mukesh',
    email: "mukesh@gmail.com",
    numbers: 2131201231,
    role: "Student",
    deviceId: 487878,
  },
  {
    logo: BrandOne,
    name: 'Moksh',
    email: "moksh@gmail.com",
    numbers: 2131231231,
    role: "User",
    deviceId: 487878,
  },
  {
    logo: BrandOne,
    name: 'Kishan',
    email: "kishan@gmail.com",
    numbers: 2131231231,
    role: "Founder",
    deviceId: 487878,
  },
];

const TableOne = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { users, token, user } = useSelector((state: RootState) => ({
    users: state.auth.users,
    token: state.auth.token,
    user: state.auth.user,
  }));

  useEffect(() => {
    if (token && user?.id) {
      dispatch(fetchUsers({ token, userId: user.id }));
    }
  }, [dispatch, token, user]);

  console.log("users", users)

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Users
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Phone Number
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Role
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            deviceId
            </h5>
          </div>
        </div>

        {brandData?.map((user: any, index: number) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              index === brandData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={user._id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <p className="text-black dark:text-white">{user.name}</p>
              {/* <p className="text-black dark:text-white">{user.firstName +" "+ user.lastName}</p> */}
            </div>


            <div className="flex items-center justify-start p-2.5 xl:p-5">
              <p className="text-black text-sm dark:text-white">{user.email}</p>
            </div>


            <div className="flex items-center justify-start p-2.5 xl:p-5">
              <p className="text-black text-sm dark:text-white">{user.numbers}</p>
            </div>

            <div className="flex items-center justify-start p-2.5 xl:p-5">
              <p className="text-black text-sm dark:text-white">{user.role}</p>
            </div>

            {/* <div className="flex items-center justify-start p-2.5 xl:p-5">
              <p className="text-black text-sm dark:text-white">{user.role}</p>
            </div> */}
            <div className="flex items-center justify-start p-2.5 xl:p-5">
              <p className="text-black text-sm dark:text-white">{user.deviceId}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;