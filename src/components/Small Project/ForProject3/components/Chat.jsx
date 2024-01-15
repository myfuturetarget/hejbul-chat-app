import { useContext } from 'react';
import Input from './Input';
import Messages from './Messages';
import { ChatContext } from '../Hooks/ChatContext';

// eslint-disable-next-line react/prop-types
const Chat = ({ backHandle, back }) => {
  const { data } = useContext(ChatContext);

  return (
    <div
      className={`max-sm:w-[100%] w-[70%] max-lg:w-[60%] flex flex-col justify-between${
        back ? ' max-sm:hidden' : 'max-sm:block'
      }`}
    >
      <div className=" flex justify-between items-center bg-red-300 p-[26.5px] max-sm:p-[20px]">
        <div className=" flex gap-3 items-center">
          <i
            onClick={backHandle}
            className={`fa-solid fa-arrow-left cursor-pointer text-white hidden max-sm:block`}
          ></i>
          <span className=" text-white">{data.user.displayName}</span>
        </div>
        <div className=" flex justify-between items-center gap-5">
          <i className="fa-solid fa-video text-zinc-100 cursor-pointer"></i>
          <i className="fa-solid fa-user-plus text-zinc-100 cursor-pointer"></i>
          <i className="fa-solid fa-ellipsis text-zinc-100 cursor-pointer text-lg"></i>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
