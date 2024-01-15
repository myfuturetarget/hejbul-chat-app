import { useState } from 'react';
import '../../../..//assets/css/project3.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/AuthContext';
const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showHide, setShowHide] = useState(false);

  const showHideHandle = () => {
    if (!showHide) {
      setShowHide(true);
    } else {
      setShowHide(false);
    }
  };

  const { signup, currentUser } = useAuth();
  const navigate = useNavigate();

  async function registerHandleFunc(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await signup(email, password, username, file);
      // setLoading(false);
      navigate('/');
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError('Failed to Register account');
    }
    console.log(currentUser);
  }
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
          <p className=" text-center pb-5 text-red-300">Register Now</p>
          <form onSubmit={registerHandleFunc}>
            <div className=" flex items-center border w-full justify-between mb-3">
              <input
                required
                onChange={e => setUserName(e.target.value)}
                className=" outline-none py-2 pl-3 w-full"
                placeholder="username"
                type="text"
              />
              <i className="fa-solid fa-user p-3 text-red-300 "></i>
            </div>
            <div className=" flex items-center border w-full justify-between mb-3">
              <input
                required
                onChange={e => setEmail(e.target.value)}
                className=" outline-none py-2 pl-3 w-full"
                placeholder="boss@gmail.com"
                type="email"
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
            <input
              required
              style={{ display: 'none' }}
              type="file"
              id="file"
              onChange={e => setFile(e.target.files[0])}
            />
            <label
              htmlFor="file"
              className=" text-red-300 cursor-pointer mt-2 flex justify-center"
            >
              <i className="fa-solid fa-images mr-2 text-2xl"></i>
              Choose an image
            </label>
            <button
              disabled={loading}
              className=" outline-none border-none w-full py-3 text-white bg-red-300 transition hover:bg-red-400 my-5"
              type="submit"
            >
              Register
            </button>
            {error && (
              <p className=" text-center pb-2 text-red-500 ">
                Something went wrong.
              </p>
            )}
            <p className=" text-center">
              Already have an account?{' '}
              <NavLink
                to={'/login'}
                className=" text-red-200 hover:text-red-500 hover:underline transition-all"
              >
                log-in
              </NavLink>{' '}
              now.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
