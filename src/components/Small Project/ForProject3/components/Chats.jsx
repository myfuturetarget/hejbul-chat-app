import { useContext, useEffect, useState } from 'react';
import manImg from '../../../../assets/img/try1.png';
import { useAuth } from '../Hooks/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../../firebase';
import { ChatContext } from './../Hooks/ChatContext';

// eslint-disable-next-line react/prop-types
const Chats = ({ forwordHandle }) => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useAuth();
  const { dispatch } = useContext(ChatContext);

  const handleSelect = u => {
    dispatch({ type: 'change_user', payload: u });
    forwordHandle();
  };

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), doc => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  return (
    <div className=" overflow-y-auto">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].data - a[1].data)
        .map(chat => (
          <div
            onClick={() => handleSelect(chat[1].userInfo)}
            key={chat[0]}
            className=" w-full flex items-start cursor-pointer hover:bg-red-200 p-2"
          >
            <img
              src={
                chat[1].userInfo.photoURL ? chat[1].userInfo.photoURL : manImg
              }
              alt="Chat user image"
              className=" w-10 h-10 mr-2 rounded-full object-cover border border-white"
            />
            <div className=" self-start">
              <span className=" text-sm font-bold">
                {chat[1].userInfo.displayName}
              </span>
              <p className=" text-xs w-[200px] text-ellipsis overflow-hidden whitespace-nowrap text-zinc-500">
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
