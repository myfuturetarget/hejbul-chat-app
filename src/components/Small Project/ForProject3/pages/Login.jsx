import { NavLink } from 'react-router-dom';
import '../../../..//assets/css/project3.css';
import { useAuth } from '../Hooks/AuthContext';
import { useState } from 'react';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showHide, setShowHide] = useState(false);

  const showHideHandle = () => {
    if (!showHide) {
      setShowHide(true);
    } else {
      setShowHide(false);
    }
  };

  const loginHandlefunc = e => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <div className=" w-full h-lvh flex justify-center items-end min-h-[940px] bg-slate-100 pt-10">
      <div className="circle rounded-full "></div>
      {/* <div className="circle rounded-full"></div>
      <div className="circle rounded-full"></div>
      <div className="circle rounded-full"></div>
      <div className="circle rounded-full"></div>
      <div className="circle rounded-full"></div> */}
      <div className=" absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 shadow-xl">
        <div className=" w-[400px] h-[500px] bg-white p-6">
          <h1 className=" text-center text-3xl font-bold pb-2 font-['Cinzel'] text-zinc-500">
            Hejbul Chat
          </h1>
          <p className=" text-center pb-5 text-red-300">Log-in Now</p>
          <form action="#">
            <div className=" flex items-center border w-full justify-between mb-3">
              <input
                className=" outline-none py-2 px-3"
                placeholder="boss@gmail.com"
                type="email"
                onChange={e => setEmail(e.target.value)}
              />
              <i className="fa-solid fa-envelope-circle-check p-3 text-red-300 "></i>
            </div>
            <div className=" flex items-center border w-full justify-between mb-3">
              <input
                required
                onChange={e => setPassword(e.target.value)}
                className=" outline-none py-2 pl-3 w-full"
                placeholder="Kf26Lr45#$"
                type={showHide ? 'text' : 'password'}
              />
              <i
                onClick={showHideHandle}
                className={`${
                  showHide ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
                } p-3 text-red-300 cursor-pointer`}
              ></i>
            </div>
            <button
              onClick={loginHandlefunc}
              className=" outline-none border-none w-full py-3 text-white bg-red-300 transition hover:bg-red-400 my-5"
              type="submit"
            >
              Login
            </button>
            <p className=" text-center">
              Nothing have an account?{' '}
              <NavLink
                to={'/register'}
                className=" text-red-200 hover:text-red-500 hover:underline transition-all"
              >
                Register
              </NavLink>{' '}
              now.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
