import manImg from '../../../../assets/img/try1.png';
import { useAuth } from '../Hooks/AuthContext';
const Navbar = () => {
  const { logout, currentUser } = useAuth();
  const logoutFunc = () => {
    if (confirm('Do you want to logout from this site?')) {
      logout();
    }
  };
  return (
    <div className=" flex items-center justify-between bg-red-300 py-5 px-2 border-r border-l-white">
      <div>
        <h1 className=" text-white text-2xl font-bold">Chats</h1>
      </div>
      <div className=" flex items-center gap-3">
        <div className=" flex items-center gap-1">
          <img
            src={currentUser ? currentUser.photoURL : manImg}
            alt="demo image for user"
            className=" w-10 h-10 rounded-full object-cover border"
          />
          <span className=" text-sm text-zinc-100 ">
            {currentUser ? currentUser.displayName : 'Unkown user'}
          </span>
        </div>
        <div>
          <button
            onClick={logoutFunc}
            className=" text-sm outline-none bg-red-300 p-2 text-zinc-100 shadow-lg border hover:bg-red-400 rounded transition"
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
