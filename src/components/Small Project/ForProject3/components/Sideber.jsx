import Search from './Search';
import Navbar from './Navbar';
import Chats from './Chats';

// eslint-disable-next-line react/prop-types
const Sideber = ({ forwordHandle, forword }) => {
  return (
    <div
      className={` max-sm:w-[100%] max-sm:h-full w-[30%] max-lg:w-[40%] border-r border-rose-300 bg-red-100 flex flex-col ${
        forword ? 'max-sm:hidden' : 'max-sm:block'
      }`}
    >
      <Navbar />
      <Search />
      <Chats forwordHandle={forwordHandle} />
    </div>
  );
};

export default Sideber;
