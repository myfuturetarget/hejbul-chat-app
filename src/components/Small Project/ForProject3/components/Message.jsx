import '../../../..//assets/css/project3.css';
import { useAuth } from '../Hooks/AuthContext';
import { useContext, useEffect, useRef } from 'react';
import { ChatContext } from '../Hooks/ChatContext';

// eslint-disable-next-line react/prop-types
const Message = ({ message }) => {
  console.log(message);
  const { currentUser } = useAuth();
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex p-5 ${
        // eslint-disable-next-line react/prop-types
        message.senderId === currentUser.uid ? 'flex-row-reverse pr-0' : ''
      }`}
    >
      {/* <div>
        <img
          src={
            // eslint-disable-next-line react/prop-types
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="user image"
          className=" w-10 h-10 rounded-full object-cover"
        />
        <span className=" text-xs text-zinc-500">just now</span>
      </div> */}
      <div>
        <img
          src={
            // eslint-disable-next-line react/prop-types
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="user image"
          className={`w-10 h-10 max-sm:w-7 max-sm:h-7 rounded-full object-cover ${
            message.senderId === currentUser.uid ? 'hidden' : 'block'
          }`}
        />
        {/* <span className=" text-xs text-zinc-500">just now</span> */}
      </div>
      <div
        className={`self-start mt-3 flex flex-col ${
          // eslint-disable-next-line react/prop-types
          message.senderId === currentUser.uid
            ? 'sent_for_msg4'
            : 'sent_for_msg3'
        }`}
      >
        <p
          className={`p-2 mb-2 max-sm:text-sm max-w-[450px] max-sm:max-w-[200px] ${
            // eslint-disable-next-line react/prop-types
            message.senderId === currentUser.uid
              ? 'sent_for_msg2'
              : 'sent_for_msg1'
          } `}
        >
          {message.text}
        </p>
        {message.img && (
          <img
            // eslint-disable-next-line react/prop-types
            src={message.img}
            alt="You can't upload video file now."
            className={` max-w-[500px] max-h-[800px] object-cover max-sm:max-w-[270px] max-sm:max-h-[160px] ${
              // eslint-disable-next-line react/prop-types
              message.senderId === currentUser.uid ? 'sent_img' : 'recive_img'
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
