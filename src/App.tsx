import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { setToken, setUser } from './store/authSlice';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state?.auth?.token);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
    
      dispatch(setToken(storedToken));
      dispatch(setUser(JSON.parse(storedUser)));
    } else {
      navigate('/auth/signin');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log('Stored Token:', storedToken); // Debug
  
    if (!token && pathname !== '/auth/signin' && pathname !== '/auth/signup') {
      console.log('Redirecting to Sign-In');
      navigate('/auth/signin');
    } else if (token && (pathname === '/auth/signin' || pathname === '/auth/signup')) {
      console.log('Redirecting to Dashboard');
      navigate('/dashboard');
    }
  }, [pathname,token, navigate]);
  
  
  // Redirect based on token presence
  useEffect(() => {
    if (!token && pathname !== '/auth/signin' && pathname !== '/auth/signup') {
      navigate('/auth/signin');
    } else if (
      token &&
      (pathname === '/auth/signin' || pathname === '/auth/signup')
    ) {
      navigate('/dashboard');
    }
  }, [token, pathname, navigate]);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      {/* <DefaultLayout> */}
      <Route
        path="/dashboard"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="Admin" />
              <ECommerce />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/calendar"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="Admin" />
              <Calendar />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/profile"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="Admin" />
              <Profile />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/forms/form-elements"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="Form Elements | Admin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/forms/form-layout"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="Form Layout | Admin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/user-list"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="Tables | Admin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/settings"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="Admin" />
              <Settings />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/chart"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="Admin" />
              <Chart />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/ui/alerts"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="Admin" />
              <Alerts />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/ui/buttons"
        element={
          <>
            <DefaultLayout>
              <PageTitle title="Buttons | Admin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </DefaultLayout>
          </>
        }
      />

      {/* <Route
        path="/auth/signup"
        element={
          <>
            <PageTitle title="Signup" />
            <SignUp />
          </>
        }
      /> */}

      {/* </DefaultLayout> */}
      <Route
        path="/auth/signin"
        element={
          <>
            <PageTitle title="Signin" />
            <SignIn />
          </>
        }
      />
    </Routes>
  );
}

export default App;