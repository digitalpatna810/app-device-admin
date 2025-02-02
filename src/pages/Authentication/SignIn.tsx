import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../../FirebaseConfig"
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginUI from '../../components/LoginUI';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Invalid email address');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
      // setUserData(userCredential)
      localStorage.setItem("user",userCredential.user.email)
      localStorage.setItem("token",userCredential.user.accessToken)
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center h-screen">
            <div className="hidden w-full xl:block xl:w-1/2">
              <div className="py-17.5 px-26 text-center">
                <Link className="mb-5.5 inline-block" to="/dashboard">
                  <img className="hidden dark:block" src={Logo} alt="Logo" />
                  <img className="dark:hidden" src={LogoDark} alt="Logo" />
                </Link>

                <p className="2xl:px-20">Welcome back! Please sign in to your account.</p>

                <LoginUI />
              </div>
            </div>
            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Sign In to Admin
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="6+ Characters, 1 Capital letter"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    >
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </GoogleOAuthProvider>
    </>
  );
};

export default SignIn;


// import * as React from 'react';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { signIn } from '../../store/authSlice';
// import LogoDark from '../../images/logo/logo-dark.svg';
// import Logo from '../../images/logo/logo.svg';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import LoginUI from '../../components/LoginUI';
// import { AppDispatch } from '../../store/Store';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// const SignIn: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const dispatch: AppDispatch = useDispatch();
//   const navigate = useNavigate();
//   const authState = useSelector((state: any) => state.auth);
//   const errorMsg = authState?.error?.error?.msg;

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!email || !password) {
//       toast.error('Email and password are required');
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       toast.error('Invalid email address');
//       return;
//     }

//     if (password.length < 6) {
//       toast.error('Password must be at least 6 characters');
//       return;
//     }

//     const credentials = {
//       email,
//       password,
//       ipAddress: '103.47.44.138',
//     };

//     setIsLoading(true);

//     try {
//       const response = await (dispatch(signIn(credentials)) as any).unwrap();
//         console.log(response);
//         toast.success('Logged in successfully!');
//         navigate('/dashboard');
      
//     } catch (err: any) {
//       toast.error(errorMsg || err.message || 'Failed to sign in. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLoginSuccess = (response) => {
//     console.log('Login Success:', response);
//     // You can extract the token and send it to your backend here
//   };

//   const handleLoginFailure = (error) => {
//     console.log('Login Failed:', error);
//   };

//   return (
//     <>
//     {/* <GoogleOAuthProvider clientId="AIzaSyB4aTKtMMNWFd0tl6_SgmICikM3bFEuZPI"> */}
//       <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="flex flex-wrap items-center h-screen">
//           <div className="hidden w-full xl:block xl:w-1/2">
//             <div className="py-17.5 px-26 text-center">
//               <Link className="mb-5.5 inline-block" to="/dashboard">
//                 <img className="hidden dark:block" src={Logo} alt="Logo" />
//                 <img className="dark:hidden" src={LogoDark} alt="Logo" />
//               </Link>

//               <p className="2xl:px-20">Welcome back! Please sign in to your account.</p>

//               <LoginUI />
//             </div>
//           </div>
//           <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
//             <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
//               <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
//                 Sign In to Admin
//               </h2>

//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <label className="mb-2.5 block font-medium text-black dark:text-white">
//                     Email
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="Enter your email"
//                       className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-6">
//                   <label className="mb-2.5 block font-medium text-black dark:text-white">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="6+ Characters, 1 Capital letter"
//                       className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-5">
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
//                   >
//                     {isLoading ? 'Signing In...' : 'Sign In'}
//                   </button>
//                 </div>
//               </form>
//               {/* <GoogleLogin
//                 onSuccess={handleLoginSuccess}
//                 onError={handleLoginFailure}
//               /> */}
//             </div>
//           </div>
//         </div>
//         <ToastContainer />
//       </div>
//       {/* </GoogleOAuthProvider> */}
//     </>
//   );
// };

// export default SignIn;